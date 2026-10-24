import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {DrawerFixture} from "./fixtures";

// The exit transition lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const renderDrawer = () => render(<DrawerFixture />);

const runningAnimations = (dialog: HTMLElement) => {
  const content = dialog.closest("[data-slot='drawer-content']");

  return dialog.getAnimations().length + (content?.getAnimations().length ?? 0);
};

describe("Drawer (browser)", () => {
  it("runs the enter animation when the drawer opens", async () => {
    await render(<DrawerFixture placement="bottom" />);

    const names: string[] = [];
    const start = performance.now();
    const tick = () => {
      const content = document.querySelector("[data-slot='drawer-content']");

      if (content) {
        for (const animation of content.getAnimations()) {
          const name = (animation as CSSAnimation).animationName;

          if (name) names.push(name);
        }
      }
      if (performance.now() - start < 500) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    await page.getByRole("button", {name: "Open Drawer"}).click();
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(names).toContain("heroui-drawer-enter-bottom");

    const dialog = page.getByRole("dialog").element() as HTMLElement;

    await expect.poll(() => getComputedStyle(dialog).translate).toBe("0px");
  });

  it.each(["pointercancel", "lostpointercapture"])(
    "supports recovery after %s interrupts a drag",
    async (eventType) => {
      await render(<DrawerFixture placement="bottom" />);
      await page.getByRole("button", {name: "Open Drawer"}).click();

      const dialog = page.getByRole("dialog");
      const element = dialog.element() as HTMLElement;

      await expect.poll(() => runningAnimations(element)).toBe(0);

      const rect = element.getBoundingClientRect();
      const dispatch = (type: string, offset: number) =>
        element.dispatchEvent(
          new PointerEvent(type, {
            bubbles: true,
            button: 0,
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + 8 + offset,
            isPrimary: true,
            pointerId: 1,
            pointerType: "touch",
          }),
        );

      // Synthetic cancellation exercises cleanup against real layout, but has no live pointer to capture.
      element.setPointerCapture = () => {};
      element.releasePointerCapture = () => {};

      dispatch("pointerdown", 0);
      dispatch("pointermove", 40);
      expect(element.getBoundingClientRect().top).toBeCloseTo(rect.top + 40);
      dispatch(eventType, 40);

      await expect.poll(() => element.getBoundingClientRect().top).toBeCloseTo(rect.top);
      await expect.poll(() => element.style.transition).toBe("");
      await expect.element(dialog).toBeInTheDocument();

      // Events from the cancelled gesture cannot move or dismiss the drawer.
      dispatch("pointermove", rect.height);
      dispatch("pointerup", rect.height);
      expect(element.getBoundingClientRect().top).toBeCloseTo(rect.top);
      await expect.element(dialog).toBeInTheDocument();

      // A fresh gesture still works, and its normal capture release must not cancel dismissal.
      dispatch("pointerdown", 0);
      dispatch("pointermove", rect.height);
      dispatch("pointerup", rect.height);
      dispatch("lostpointercapture", rect.height);
      await expect.element(dialog).not.toBeInTheDocument();
    },
  );

  it("supports an in-progress drag when a child loses pointer capture", async () => {
    await render(<DrawerFixture placement="bottom" />);
    await page.getByRole("button", {name: "Open Drawer"}).click();

    const dialog = page.getByRole("dialog");
    const element = dialog.element() as HTMLElement;

    await expect.poll(() => runningAnimations(element)).toBe(0);

    const rect = element.getBoundingClientRect();
    const header = element.querySelector("[data-slot='drawer-header']");

    expect(header).not.toBeNull();

    const dispatch = (target: EventTarget, type: string, offset: number) =>
      target.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          button: 0,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + 8 + offset,
          isPrimary: true,
          pointerId: 1,
          pointerType: "touch",
        }),
      );

    // Synthetic pointer events have no live pointer to capture.
    element.setPointerCapture = () => {};
    element.releasePointerCapture = () => {};

    dispatch(element, "pointerdown", 0);
    dispatch(element, "pointermove", 40);
    expect(element.getBoundingClientRect().top).toBeCloseTo(rect.top + 40);

    // Taking capture fires lostpointercapture on the hit child first. That must not abort the drag.
    dispatch(header as HTMLElement, "lostpointercapture", 40);

    expect(element.getBoundingClientRect().top).toBeCloseTo(rect.top + 40);
    expect(element.style.transform).toBe("translateY(40px)");

    dispatch(element, "pointermove", 80);
    expect(element.getBoundingClientRect().top).toBeCloseTo(rect.top + 80);
    await expect.element(dialog).toBeInTheDocument();
  });

  it("supports focus trap, scroll lock, and Escape focus restore", async () => {
    await renderDrawer();

    const trigger = page.getByRole("button", {name: "Open Drawer"});

    await trigger.click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(true);
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.tab();
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.keyboard("{Escape}");

    await expect.element(dialog).not.toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(false);
    await expect.element(trigger).toHaveFocus();
  });

  it("runs the exit transition after a swipe-to-dismiss", async () => {
    await render(<DrawerFixture placement="bottom" />);

    await page.getByRole("button", {name: "Open Drawer"}).click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();

    const element = dialog.element() as HTMLElement;

    // Let the enter transition settle so the drag starts from a resting drawer.
    await expect.poll(() => runningAnimations(element)).toBe(0);

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const startY = rect.top + 8;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const dispatch = (type: string, y: number) =>
      element.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          button: 0,
          clientX: x,
          clientY: y,
          isPrimary: true,
          pointerId: 1,
          pointerType: "touch",
        }),
      );

    // Synthetic pointer events have no live pointer to capture.
    element.setPointerCapture = () => {};
    element.releasePointerCapture = () => {};

    dispatch("pointerdown", startY);
    dispatch("pointermove", startY + 40);
    await wait(20);
    dispatch("pointermove", startY + rect.height);
    // A real finger rests for at least a frame before lifting.
    await wait(50);
    dispatch("pointerup", startY + rect.height);

    // `transition: none` is applied while dragging. If it outlives the drag, no transition
    // runs on exit and the drawer unmounts without sliding out.
    await expect
      .poll(() =>
        element
          .getAnimations()
          .some((animation) => (animation as CSSTransition).transitionProperty === "translate"),
      )
      .toBe(true);

    await expect.element(dialog).not.toBeInTheDocument();
  });
});
