import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {useEffect, useState} from "react";
import {cdp, page, userEvent} from "vitest/browser";

import {Button} from "@/components/button";
import {Sheet} from "@/components/sheet";

import {SheetFixture} from "./fixtures";

import "@/styles.css";

type CDPSession = {
  send: (method: string, params: Record<string, unknown>) => Promise<unknown>;
};

const slot = (name: string) => document.querySelector<HTMLElement>(`[data-slot="sheet-${name}"]`)!;
const pause = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));
const open = async () => {
  await page.getByRole("button", {exact: true, name: "Open sheet"}).click();
  await expect.element(page.getByRole("dialog", {exact: true, name: "Details"})).toBeVisible();
  await expect
    .poll(() => {
      const rect = slot("dialog").getBoundingClientRect();

      return (
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0) > 1 &&
        Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0) > 1
      );
    })
    .toBe(true);
  // A missing data-entering flag can precede the end of native scroll motion.
  // For fully opening sheets, wait for their resting edge and stable geometry.
  await expect
    .poll(
      async () => {
        const content = slot("content");
        const dialog = slot("dialog");

        if (!content || !dialog || slot("overlay")?.hasAttribute("data-entering")) return false;
        if (content.hasAttribute("data-snap-points")) return true;
        const rect = dialog.getBoundingClientRect();
        const placement = content.dataset["placement"];
        const inset = content.hasAttribute("data-detached")
          ? parseFloat(getComputedStyle(content).getPropertyValue(`margin-${placement}`)) || 0
          : 0;
        const edge =
          placement === "left"
            ? rect.left - inset
            : placement === "right"
              ? rect.right - window.innerWidth + inset
              : placement === "top"
                ? rect.top - inset
                : rect.bottom - window.innerHeight + inset;

        if (Math.abs(edge) >= 2) return false;
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
        const settled = dialog.getBoundingClientRect();

        return (
          dialog.isConnected &&
          Math.abs(settled.left - rect.left) < 0.5 &&
          Math.abs(settled.top - rect.top) < 0.5
        );
      },
      {timeout: 5000},
    )
    .toBe(true);
};
const coordinates = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const frame = window.frameElement?.getBoundingClientRect();

  const scale = frame ? frame.width / window.innerWidth : 1;

  return {
    scale,
    x: (rect.left + rect.width / 2) * scale + (frame?.left ?? 0),
    y: (rect.top + rect.height / 2) * scale + (frame?.top ?? 0),
  };
};

async function mouseDrag(dx: number, dy: number, release = true) {
  const {scale, x, y} = coordinates(slot("handle"));

  dx *= scale;
  dy *= scale;
  const client = cdp() as CDPSession;

  await client.send("Input.dispatchMouseEvent", {type: "mouseMoved", x, y});
  await client.send("Input.dispatchMouseEvent", {
    button: "left",
    buttons: 1,
    clickCount: 1,
    type: "mousePressed",
    x,
    y,
  });
  for (let step = 1; step <= 8; step++) {
    await client.send("Input.dispatchMouseEvent", {
      button: "left",
      buttons: 1,
      type: "mouseMoved",
      x: x + (dx * step) / 8,
      y: y + (dy * step) / 8,
    });
    await pause();
  }
  if (release)
    await client.send("Input.dispatchMouseEvent", {
      button: "left",
      buttons: 0,
      clickCount: 1,
      type: "mouseReleased",
      x: x + dx,
      y: y + dy,
    });
}

async function touchSwipe(element: HTMLElement, dy: number) {
  const {scale, x, y} = coordinates(element);
  const client = cdp() as CDPSession;
  // Keep fling velocity stable when the runner delays individual CDP calls.
  const startedAt = Date.now() / 1000;

  dy *= scale;
  await client.send("Emulation.setTouchEmulationEnabled", {enabled: true, maxTouchPoints: 1});
  try {
    await client.send("Input.dispatchTouchEvent", {
      timestamp: startedAt,
      touchPoints: [{x, y}],
      type: "touchStart",
    });
    for (let step = 1; step <= 10; step++) {
      await client.send("Input.dispatchTouchEvent", {
        timestamp: startedAt + step * 0.01,
        touchPoints: [{x, y: y + (dy * step) / 10}],
        type: "touchMove",
      });
      await pause(8);
    }
    await client.send("Input.dispatchTouchEvent", {
      timestamp: startedAt + 0.11,
      touchPoints: [],
      type: "touchEnd",
    });
  } finally {
    await client.send("Emulation.setTouchEmulationEnabled", {enabled: false});
  }
}

afterEach(async () => {
  await (cdp() as CDPSession).send("Input.dispatchMouseEvent", {
    button: "left",
    buttons: 0,
    type: "mouseReleased",
    x: 0,
    y: 0,
  });
  await (cdp() as CDPSession).send("Emulation.setEmulatedMedia", {features: []});
});

describe("Sheet (browser)", () => {
  it("supports focus containment, scroll lock, Escape dismissal, and lifecycle callbacks", async () => {
    const onAnimationEnd = vi.fn();

    await render(<SheetFixture onAnimationEnd={onAnimationEnd} />);
    await open();
    expect(isDocumentScrollLocked()).toBe(true);
    expect(slot("dialog").contains(document.activeElement)).toBe(true);
    for (let i = 0; i < 4; i++) await userEvent.tab();
    expect(slot("dialog").contains(document.activeElement)).toBe(true);
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true]]);
    await userEvent.keyboard("{Escape}");
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    await expect.poll(() => isDocumentScrollLocked()).toBe(false);
    await expect.element(page.getByRole("button", {name: "Open sheet"})).toHaveFocus();
    expect(onAnimationEnd.mock.calls).toEqual([[true], [false]]);
  });

  it.each(["bottom", "top", "left", "right"] as const)(
    "supports %s placement, explicit closing, and handle dismissal",
    async (placement) => {
      await render(<SheetFixture placement={placement} />);
      await open();
      const rect = slot("dialog").getBoundingClientRect();

      expect(slot("content")).toHaveAttribute("data-position", placement);
      if (placement === "bottom")
        expect(Math.abs(rect.bottom - window.innerHeight)).toBeLessThan(2);
      if (placement === "top")
        await expect
          .poll(() => Math.abs(slot("dialog").getBoundingClientRect().top))
          .toBeLessThan(2);
      if (placement === "left")
        await expect
          .poll(() => Math.abs(slot("dialog").getBoundingClientRect().left))
          .toBeLessThan(2);
      if (placement === "right")
        await expect
          .poll(() => Math.abs(slot("dialog").getBoundingClientRect().right - window.innerWidth))
          .toBeLessThan(2);
      const distance =
        placement === "left" || placement === "right"
          ? rect.width * 0.6
          : Math.min(rect.height * 0.6, 160);

      await mouseDrag(
        placement === "left" ? -distance : placement === "right" ? distance : 0,
        placement === "top" ? -distance : placement === "bottom" ? distance : 0,
      );
      await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
      await open();
      await page.getByRole("button", {name: "Dismiss sheet"}).click();
      await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    },
  );

  it.each(["top", "left"] as const)(
    "supports settled %s reopening after handle dismissal under CPU throttling",
    async (placement) => {
      const client = cdp() as CDPSession;
      const onOpenChange = vi.fn();

      await client.send("Emulation.setCPUThrottlingRate", {rate: 6});
      try {
        await render(<SheetFixture placement={placement} onOpenChange={onOpenChange} />);
        for (let cycle = 0; cycle < 3; cycle++) {
          await open();
          const rect = slot("dialog").getBoundingClientRect();

          await mouseDrag(
            placement === "left" ? -rect.width * 0.6 : 0,
            placement === "top" ? -Math.min(rect.height * 0.6, 160) : 0,
          );
          await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
          await open();
          const reopened = slot("dialog").getBoundingClientRect();

          expect(Math.abs(placement === "left" ? reopened.left : reopened.top)).toBeLessThan(2);
          await page.getByRole("button", {name: "Dismiss sheet"}).click();
          await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
          expect(onOpenChange.mock.calls).toEqual(
            Array.from({length: (cycle + 1) * 4}, (_, index) => [index % 2 === 0]),
          );
        }
      } finally {
        await client.send("Emulation.setCPUThrottlingRate", {rate: 1});
      }
    },
    30000,
  );

  it("supports pixel snap points, legacy full-height sentinel, and body scrolling after expansion", async () => {
    await render(
      <SheetFixture snapPoints={[220, 1]}>
        {Array.from({length: 50}, (_, i) => (
          <p key={i}>Item {i}</p>
        ))}
      </SheetFixture>,
    );
    await open();
    await expect
      .poll(() => Math.round(window.innerHeight - slot("dialog").getBoundingClientRect().top))
      .toBe(220);
    expect(getComputedStyle(slot("body")).overflowY).toBe("hidden");
    await mouseDrag(0, -Math.min(window.innerHeight - 240, 350));
    await expect.poll(() => slot("content").hasAttribute("data-expanded")).toBe(true);
    expect(getComputedStyle(slot("body")).overflowY).toBe("auto");
    slot("body").scrollTop = 80;
    await expect.poll(() => slot("body").scrollTop).toBeGreaterThan(0);
  });

  describe.each([false, true])("fractional-height body scrolling (snap points: %s)", (snaps) => {
    it.each([
      [414, 896],
      [1280, 737],
    ] as const)(
      "supports wheel scrolling at %s × %s after full expansion",
      async (width, height) => {
        const originalViewport = {width: window.innerWidth, height: window.innerHeight};

        await page.viewport(width, height);
        try {
          const onAnimationEnd = vi.fn();

          await render(
            <SheetFixture
              contentProps={{className: "mx-auto max-h-[95vh] max-w-[420px]"}}
              snapPoints={snaps ? [220, 1] : undefined}
              onAnimationEnd={onAnimationEnd}
            >
              {Array.from({length: 40}, (_, i) => (
                <p key={i}>Paragraph {i}: Scrollable content</p>
              ))}
            </SheetFixture>,
          );
          await open();
          await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true]]);
          expect(parseFloat(getComputedStyle(slot("content")).maxHeight)).toBeCloseTo(
            height * 0.95,
            1,
          );
          if (snaps) {
            expect(getComputedStyle(slot("body")).overflowY).toBe("hidden");
            await mouseDrag(0, -(height - 240));
          }
          await expect.poll(() => slot("content").hasAttribute("data-expanded")).toBe(true);
          const body = slot("body");

          expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
          const {x, y} = coordinates(body);

          await (cdp() as CDPSession).send("Input.dispatchMouseEvent", {
            type: "mouseWheel",
            x,
            y,
            deltaX: 0,
            deltaY: 250,
          });
          await expect.poll(() => body.scrollTop).toBeGreaterThan(0);
          expect(slot("dialog")).toBeVisible();
        } finally {
          await page.viewport(originalViewport.width, originalViewport.height);
        }
      },
    );
  });

  it("supports percentage snap points", async () => {
    await render(<SheetFixture snapPoints={["40%", "100%"]} />);
    await open();
    const rect = slot("dialog").getBoundingClientRect();

    expect(Math.abs(window.innerHeight - rect.top - rect.height * 0.4)).toBeLessThan(3);
  });

  it.each(["pointercancel", "lostpointercapture"])("supports recovery after %s", async (type) => {
    await render(<SheetFixture />);
    await open();
    const handle = slot("handle");
    const initial = slot("dialog").getBoundingClientRect().top;
    let pointerId = 0;

    handle.addEventListener(
      "pointerdown",
      (event) => {
        pointerId = event.pointerId;
      },
      {once: true},
    );
    await mouseDrag(0, 45, false);
    expect(slot("dialog").getBoundingClientRect().top).toBeGreaterThan(initial + 20);
    handle.dispatchEvent(new PointerEvent(type, {bubbles: true, pointerId}));
    await expect
      .poll(() => Math.round(slot("dialog").getBoundingClientRect().top))
      .toBe(Math.round(initial));
    expect(handle).not.toHaveAttribute("data-dragging");
    await (cdp() as CDPSession).send("Input.dispatchMouseEvent", {
      button: "left",
      buttons: 0,
      type: "mouseReleased",
      x: 0,
      y: 0,
    });
    await page.getByRole("button", {name: "Done"}).click();
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports native touch dismissal outside the handle", async () => {
    await render(<SheetFixture contentProps={{style: {height: 300}}} />);
    await open();
    await touchSwipe(slot("header"), 220);
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports non-dismissable sheets while allowing explicit close", async () => {
    await render(<SheetFixture isDismissable={false} />);
    await open();
    await userEvent.keyboard("{Escape}");
    await mouseDrag(0, 100);
    await expect.poll(() => slot("content").hasAttribute("data-expanded")).toBe(true);
    await expect.element(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", {name: "Done"}).click();
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports detached layout and reduced-motion handle release", async () => {
    await (cdp() as CDPSession).send("Emulation.setEmulatedMedia", {
      features: [{name: "prefers-reduced-motion", value: "reduce"}],
    });
    await render(<SheetFixture isDetached />);
    await open();
    const rect = slot("dialog").getBoundingClientRect();

    expect(rect.left).toBeGreaterThan(0);
    expect(rect.right).toBeLessThan(window.innerWidth);
    expect(rect.bottom).toBeLessThan(window.innerHeight);
    await mouseDrag(0, 100);
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports nested focus restoration and parent survival", async () => {
    await render(
      <SheetFixture>
        <Sheet.NestedRoot>
          <Sheet.Trigger>
            <Button>Nested</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop>
            <Sheet.Content>
              <Sheet.Dialog aria-label="Nested details">
                <Sheet.Header>
                  <Sheet.Heading>Nested details</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>Nested content</Sheet.Body>
                <Sheet.CloseTrigger />
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet.NestedRoot>
      </SheetFixture>,
    );
    await open();
    const parent = slot("dialog");
    const initialWidth = parent.getBoundingClientRect().width;

    await expect.poll(() => parent.contains(document.activeElement)).toBe(true);
    await page.getByRole("button", {exact: true, name: "Nested"}).click();
    await expect.element(page.getByRole("dialog", {name: "Nested details"})).toBeVisible();
    const nested = page.getByRole("dialog", {name: "Nested details"}).element();

    await expect.poll(() => nested.contains(document.activeElement)).toBe(true);
    await expect.poll(() => parent.getBoundingClientRect().width).toBeLessThan(initialWidth - 1);
    await page.getByRole("button", {exact: true, name: "Close"}).click();
    await expect
      .element(page.getByRole("dialog", {name: "Nested details"}))
      .not.toBeInTheDocument();
    await expect.element(page.getByRole("dialog", {exact: true, name: "Details"})).toBeVisible();
    await expect.element(page.getByRole("button", {exact: true, name: "Nested"})).toHaveFocus();
    await expect.poll(() => parent.getBoundingClientRect().width).toBeCloseTo(initialWidth, 1);
  });

  it("supports retaining closed content without keeping the modal active", async () => {
    const onAnimationEnd = vi.fn();

    function Retained() {
      const [isOpen, setOpen] = useState(false);

      return (
        <>
          <Button onPress={() => setOpen(true)}>Open sheet</Button>
          <Sheet isOpen={isOpen} onAnimationEnd={onAnimationEnd} onOpenChange={setOpen}>
            <Sheet.Backdrop isExiting={!isOpen}>
              <Sheet.Content>
                <Sheet.Dialog aria-label="Details">
                  <Sheet.Header>
                    <Sheet.Heading>Details</Sheet.Heading>
                  </Sheet.Header>
                  <Sheet.Body>
                    <input aria-label="Retained input" defaultValue="Keep me" />
                  </Sheet.Body>
                  <Sheet.CloseTrigger />
                </Sheet.Dialog>
              </Sheet.Content>
            </Sheet.Backdrop>
          </Sheet>
        </>
      );
    }
    const view = await render(<Retained />);

    await open();
    const input = page.getByRole("textbox", {name: "Retained input"});
    const originalInput = input.element();

    await input.fill("Preserved value");
    await page.getByRole("button", {exact: true, name: "Close"}).click();
    await expect.poll(() => isDocumentScrollLocked()).toBe(false);
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false]]);
    expect(slot("dialog")).not.toBeNull();
    expect(slot("overlay")).toHaveAttribute("inert");
    (originalInput as HTMLInputElement).focus();
    expect(document.activeElement).not.toBe(originalInput);
    await page.getByRole("button", {name: "Open sheet"}).click();
    await expect.poll(() => isDocumentScrollLocked()).toBe(true);
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false], [true]]);
    await expect.element(input).toHaveValue("Preserved value");
    expect(input.element()).toBe(originalInput);
    await view.unmount();
    await expect.poll(() => isDocumentScrollLocked()).toBe(false);
  });
  it("supports a new sheet backdrop after a retained sheet closes", async () => {
    const onAnimationEnd = vi.fn();
    const retained = (isOpen: boolean, secondOpen = false) => (
      <>
        <SheetFixture
          backdropProps={{isExiting: true}}
          isOpen={isOpen}
          onAnimationEnd={onAnimationEnd}
        >
          <input aria-label="Saved input" defaultValue="Saved" />
        </SheetFixture>
        <SheetFixture dialogProps={{"aria-label": "Second sheet"}} isOpen={secondOpen} />
      </>
    );
    const view = await render(retained(true));

    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true]]);
    const originalInput = page.getByRole("textbox", {name: "Saved input"}).element();

    await view.rerender(retained(false));
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false]]);
    await view.rerender(retained(false, true));
    const overlay = document.querySelector<HTMLElement>(
      '[data-slot="sheet-overlay"]:not([data-closed])',
    )!;
    const backdrop = overlay.querySelector<HTMLElement>('[data-slot="sheet-backdrop"]')!;

    await expect.poll(() => backdrop.dataset["stackIndex"]).toBe("0");
    expect(getComputedStyle(backdrop).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    await view.rerender(retained(false));
    await expect.element(page.getByRole("dialog", {name: "Second sheet"})).not.toBeInTheDocument();
    await view.rerender(retained(true));
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false], [true]]);
    expect(page.getByRole("textbox", {name: "Saved input"}).element()).toBe(originalInput);
  });

  it.each([false, true])(
    "supports releasing retained content and effects (reduced motion: %s)",
    async (reduce) => {
      if (reduce) {
        await (cdp() as CDPSession).send("Emulation.setEmulatedMedia", {
          features: [{name: "prefers-reduced-motion", value: "reduce"}],
        });
      }
      const onAnimationEnd = vi.fn();
      const cleanup = vi.fn();

      function Content() {
        useEffect(() => cleanup, []);

        return <input aria-label="Retained value" defaultValue="Saved" />;
      }
      const fixture = (isOpen: boolean, retain: boolean, secondOpen = false) => (
        <>
          <SheetFixture
            backdropProps={{isExiting: !isOpen && retain}}
            isOpen={isOpen}
            onAnimationEnd={onAnimationEnd}
          >
            <Content />
          </SheetFixture>
          <SheetFixture dialogProps={{"aria-label": "Second sheet"}} isOpen={secondOpen} />
        </>
      );
      const view = await render(fixture(true, true));

      await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true]]);
      const originalInput = page.getByRole("textbox", {name: "Retained value"}).element();

      await view.rerender(fixture(false, true));
      await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false]]);
      expect(originalInput.isConnected).toBe(true);
      expect(cleanup).not.toHaveBeenCalled();
      expect(isDocumentScrollLocked()).toBe(false);
      await view.rerender(fixture(false, false));
      await expect.poll(() => originalInput.isConnected).toBe(false);
      expect(slot("overlay")).toBeNull();
      expect(cleanup).toHaveBeenCalledTimes(1);
      await view.rerender(fixture(false, false, true));
      await expect.element(page.getByRole("dialog", {name: "Second sheet"})).toBeVisible();
      expect(slot("backdrop")).toHaveAttribute("data-stack-index", "0");
      await view.rerender(fixture(false, false));
      await expect.poll(() => slot("overlay")).toBeNull();
      expect(isDocumentScrollLocked()).toBe(false);
      await view.rerender(fixture(true, true));
      await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false], [true]]);
      expect(page.getByRole("textbox", {name: "Retained value"}).element()).not.toBe(originalInput);
    },
  );

  describe.each([false, true])("retained snap points (reduced motion: %s)", (reduce) => {
    it.each(["bottom", "top", "left", "right"] as const)(
      "supports closing and restoring the partial %s snap point",
      async (placement) => {
        if (reduce) {
          await (cdp() as CDPSession).send("Emulation.setEmulatedMedia", {
            features: [{name: "prefers-reduced-motion", value: "reduce"}],
          });
        }
        const onAnimationEnd = vi.fn();
        const fixture = (isOpen: boolean) => (
          <SheetFixture
            backdropProps={{isExiting: !isOpen}}
            isOpen={isOpen}
            placement={placement}
            snapPoints={[100, 1]}
            onAnimationEnd={onAnimationEnd}
          >
            <input aria-label="Saved snap value" defaultValue="Saved" />
          </SheetFixture>
        );
        const view = await render(fixture(true));

        await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true]]);
        const dialog = slot("dialog");
        const initial = dialog.getBoundingClientRect();
        const horizontal = placement === "left" || placement === "right";
        const visibleSize = horizontal
          ? Math.min(initial.right, window.innerWidth) - Math.max(initial.left, 0)
          : Math.min(initial.bottom, window.innerHeight) - Math.max(initial.top, 0);

        expect(Math.abs(visibleSize - 100)).toBeLessThan(2);
        await view.rerender(fixture(false));
        await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false]]);
        expect(dialog.isConnected).toBe(true);
        await expect.poll(() => dialog.getBoundingClientRect().width).toBe(0);
        expect(isDocumentScrollLocked()).toBe(false);
        await view.rerender(fixture(true));
        await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false], [true]]);
        expect(slot("dialog")).toBe(dialog);
        const restored = dialog.getBoundingClientRect();

        expect(Math.abs(restored.top - initial.top)).toBeLessThan(2);
        expect(Math.abs(restored.left - initial.left)).toBeLessThan(2);
      },
    );
  });

  it.each(["reopen", "unmount"] as const)(
    "supports %s during a retained partial-snap exit",
    async (action) => {
      const onAnimationEnd = vi.fn();
      const fixture = (isOpen: boolean) => (
        <SheetFixture
          backdropProps={{isExiting: !isOpen}}
          isOpen={isOpen}
          snapPoints={[200, 1]}
          onAnimationEnd={onAnimationEnd}
        />
      );
      const view = await render(fixture(true));

      await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true]]);
      const dialog = slot("dialog");
      const initial = dialog.getBoundingClientRect().top;
      const scroller = slot("overlay").querySelector<HTMLElement>("[data-sheet-scroll]")!;
      const moving = new Promise<void>((resolve) => {
        scroller.addEventListener("scroll", () => resolve(), {once: true});
      });

      await view.rerender(fixture(false));
      await moving;
      expect(scroller.scrollTop).toBeGreaterThan(0);
      expect(scroller.scrollTop).toBeLessThan(200);
      if (action === "reopen") {
        await view.rerender(fixture(true));
        await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [true]]);
        await expect
          .poll(() => Math.abs(dialog.getBoundingClientRect().top - initial))
          .toBeLessThan(2);
        expect(slot("dialog")).toBe(dialog);
        expect(isDocumentScrollLocked()).toBe(true);
      } else {
        await view.unmount();
        expect(dialog.isConnected).toBe(false);
        expect(isDocumentScrollLocked()).toBe(false);
        expect(onAnimationEnd.mock.calls).toEqual([[true], [false]]);
      }
    },
  );

  it.each([false, true])(
    "calls exit completion when opening is interrupted (retained: %s)",
    async (retain) => {
      const onAnimationEnd = vi.fn();
      const view = await render(
        <SheetFixture isOpen backdropProps={{isExiting: retain}} onAnimationEnd={onAnimationEnd} />,
      );

      await expect.poll(() => slot("overlay")?.hasAttribute("data-entering")).toBe(true);
      expect(onAnimationEnd).not.toHaveBeenCalled();
      await view.rerender(
        <SheetFixture
          backdropProps={{isExiting: retain}}
          isOpen={false}
          onAnimationEnd={onAnimationEnd}
        />,
      );
      await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[false]]);
      if (!retain) await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
      expect(isDocumentScrollLocked()).toBe(false);
    },
  );

  it("calls exit completion for consecutive interrupted retained openings", async () => {
    const onAnimationEnd = vi.fn();
    const fixture = (isOpen: boolean) => (
      <SheetFixture
        backdropProps={{isExiting: true}}
        isOpen={isOpen}
        onAnimationEnd={onAnimationEnd}
      />
    );
    const view = await render(fixture(true));

    await expect.poll(() => slot("overlay")?.hasAttribute("data-entering")).toBe(true);
    await view.rerender(fixture(false));
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[false]]);
    await view.rerender(fixture(true));
    await view.rerender(fixture(false));
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[false], [false]]);
    expect(isDocumentScrollLocked()).toBe(false);
    await view.rerender(fixture(true));
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[false], [false], [true]]);
  });

  it("supports reduced motion when retained content reopens", async () => {
    await (cdp() as CDPSession).send("Emulation.setEmulatedMedia", {
      features: [{name: "prefers-reduced-motion", value: "reduce"}],
    });
    const onAnimationEnd = vi.fn();
    const fixture = (isOpen: boolean) => (
      <SheetFixture
        backdropProps={{isExiting: true}}
        isOpen={isOpen}
        onAnimationEnd={onAnimationEnd}
      />
    );
    const view = await render(fixture(true));

    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true]]);
    const initial = slot("dialog").getBoundingClientRect().top;

    await view.rerender(fixture(false));
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false]]);
    await view.rerender(fixture(true));
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    expect(Math.abs(slot("dialog").getBoundingClientRect().top - initial)).toBeLessThan(2);
    await expect.poll(() => onAnimationEnd.mock.calls).toEqual([[true], [false], [true]]);
  });

  it("supports outside dismissal and respects isDismissable", async () => {
    for (const isDismissable of [true, false]) {
      const onOpenChange = vi.fn();
      const view = await render(
        <SheetFixture isDismissable={isDismissable} onOpenChange={onOpenChange} />,
      );

      await open();
      const frame = window.frameElement?.getBoundingClientRect();
      const x = (frame?.left ?? 0) + 10;
      const y = (frame?.top ?? 0) + 100;
      const client = cdp() as CDPSession;

      await client.send("Input.dispatchMouseEvent", {
        type: "mousePressed",
        x,
        y,
        button: "left",
        buttons: 1,
        clickCount: 1,
      });
      await client.send("Input.dispatchMouseEvent", {
        type: "mouseReleased",
        x,
        y,
        button: "left",
        buttons: 0,
        clickCount: 1,
      });
      if (isDismissable) {
        await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
        expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
      } else {
        await expect.element(page.getByRole("dialog")).toBeVisible();
        expect(onOpenChange.mock.calls).toEqual([[true]]);
      }
      await view.unmount();
    }
  });

  it("supports unmount during a handle drag without leaving scroll locks or capture", async () => {
    const view = await render(<SheetFixture />);

    await open();
    const handle = slot("handle");
    const scroller = handle.closest<HTMLElement>("[data-sheet-scroll]")!;
    let pointerId = 0;

    handle.addEventListener(
      "pointerdown",
      (event) => {
        pointerId = event.pointerId;
      },
      {once: true},
    );
    await mouseDrag(0, 35, false);
    expect(handle.hasPointerCapture(pointerId)).toBe(true);
    await view.unmount();
    expect(handle.hasPointerCapture(pointerId)).toBe(false);
    expect(handle).not.toHaveAttribute("data-dragging");
    expect(scroller).not.toHaveAttribute("data-handle-dragging");
    expect(isDocumentScrollLocked()).toBe(false);
  });

  it("supports closing retained content during a handle drag", async () => {
    const view = await render(<SheetFixture isOpen backdropProps={{isExiting: true}} />);

    await expect.poll(() => slot("content")?.hasAttribute("data-expanded")).toBe(true);
    const handle = slot("handle");
    const scroller = handle.closest<HTMLElement>("[data-sheet-scroll]")!;
    let pointerId = 0;

    handle.addEventListener(
      "pointerdown",
      (event) => {
        pointerId = event.pointerId;
      },
      {once: true},
    );
    await mouseDrag(0, 35, false);
    expect(handle.hasPointerCapture(pointerId)).toBe(true);
    await view.rerender(<SheetFixture backdropProps={{isExiting: true}} isOpen={false} />);
    await expect.poll(() => handle.hasPointerCapture(pointerId)).toBe(false);
    expect(handle).not.toHaveAttribute("data-dragging");
    expect(scroller).not.toHaveAttribute("data-handle-dragging");
    expect(slot("dialog")).not.toBeNull();
    await expect.poll(() => isDocumentScrollLocked()).toBe(false);
  });
});
