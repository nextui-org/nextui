import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {ScrollShadow} from "@/components/scroll-shadow";

// The fade lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const SHADOW_SIZE = 40;
const VIEWPORT = 240;

// Read once at module scope so the groups below skip visibly instead of passing vacuously
// on an engine without scroll timelines.
const supportsScrollTimelines = CSS.supports("animation-timeline", "scroll(self)");

/** Lets the compositor apply the scroll-driven animation before styles are read. */
const nextFrames = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

const fadesOf = (element: Element) => {
  const computed = getComputedStyle(element);

  return {
    start: computed.getPropertyValue("--scroll-shadow-start-fade").trim(),
    end: computed.getPropertyValue("--scroll-shadow-end-fade").trim(),
  };
};

/** Interpolated lengths land on device pixels, so compare them numerically. */
const startFadePxOf = (element: Element) =>
  Number.parseFloat(getComputedStyle(element).getPropertyValue("--scroll-shadow-start-fade"));

const Overflowing = ({offset}: {offset?: number}) => (
  <ScrollShadow
    data-testid="scroller"
    offset={offset}
    size={SHADOW_SIZE}
    style={{height: VIEWPORT}}
  >
    <div style={{height: 1200}}>Tall content</div>
  </ScrollShadow>
);

const Fitting = () => (
  <ScrollShadow data-testid="scroller" size={SHADOW_SIZE} style={{height: VIEWPORT}}>
    <div>Short content</div>
  </ScrollShadow>
);

const OverflowingRow = ({dir}: {dir?: "ltr" | "rtl"}) => (
  <div dir={dir}>
    <ScrollShadow
      data-testid="scroller"
      orientation="horizontal"
      size={SHADOW_SIZE}
      style={{width: VIEWPORT}}
    >
      <div style={{width: 1200}}>Wide content</div>
    </ScrollShadow>
  </div>
);

const FittingRow = () => (
  <ScrollShadow
    data-testid="scroller"
    orientation="horizontal"
    size={SHADOW_SIZE}
    style={{width: VIEWPORT}}
  >
    <div style={{width: 20}}>Narrow</div>
  </ScrollShadow>
);

const scrollerOf = () => page.getByTestId("scroller").element();

const maxScrollTopOf = (element: Element) => element.scrollHeight - element.clientHeight;

const maxScrollLeftOf = (element: Element) => element.scrollWidth - element.clientWidth;

describe("ScrollShadow (browser)", () => {
  describe.skipIf(!supportsScrollTimelines)("scroll-driven fade", () => {
    it("fades only the end edge while resting at the start", async () => {
      await render(<Overflowing />);

      await expect
        .poll(() => fadesOf(scrollerOf()))
        .toEqual({start: "0px", end: `${SHADOW_SIZE}px`});
    });

    it("fades both edges once scrolled into the middle", async () => {
      await render(<Overflowing />);

      const scroller = scrollerOf();

      scroller.scrollTop = 400;

      await expect
        .poll(() => fadesOf(scroller))
        .toEqual({start: `${SHADOW_SIZE}px`, end: `${SHADOW_SIZE}px`});
    });

    it("fades only the start edge at the end of the scroll range", async () => {
      await render(<Overflowing />);

      const scroller = scrollerOf();

      scroller.scrollTop = maxScrollTopOf(scroller);

      await expect.poll(() => fadesOf(scroller)).toEqual({start: `${SHADOW_SIZE}px`, end: "0px"});
    });

    it("scrubs the start fade in across the shadow size", async () => {
      await render(<Overflowing />);

      const scroller = scrollerOf();

      scroller.scrollTop = SHADOW_SIZE / 2;

      await expect.poll(() => startFadePxOf(scroller)).toBeCloseTo(SHADOW_SIZE / 2, 0);
    });

    it("holds the start fade back until the offset is passed", async () => {
      await render(<Overflowing offset={80} />);

      const scroller = scrollerOf();

      scroller.scrollTop = 80;
      await nextFrames();

      expect(startFadePxOf(scroller)).toBe(0);

      scroller.scrollTop = 80 + SHADOW_SIZE / 2;

      await expect.poll(() => startFadePxOf(scroller)).toBeCloseTo(SHADOW_SIZE / 2, 0);
    });

    // A container without overflow has an inactive timeline, which has to hold both fades
    // at 0px rather than fade content that fits.
    it("renders no fade when the content fits", async () => {
      await render(<Fitting />);

      await nextFrames();

      expect(fadesOf(scrollerOf())).toEqual({start: "0px", end: "0px"});
    });

    // Deriving the mask from CSS alone means auto mode resolves a `mask-image` even with
    // nothing to scroll, so the root is always a stacking context. That is the deliberate
    // cost of not measuring overflow; the fade itself still collapses to a no-op.
    it("keeps a no-op mask rather than dropping it when the content fits", async () => {
      await render(<Fitting />);

      await nextFrames();

      expect(getComputedStyle(scrollerOf()).maskImage).toContain("linear-gradient");
    });

    // The hook still writes the state attributes, so the attribute rules match too. The
    // scroll-driven rules have to win the cascade, including the prefixed properties.
    it("resolves the mask from the scroll-driven gradient, not the attribute fallback", async () => {
      await render(<Overflowing />);

      const scroller = scrollerOf();

      await expect.poll(() => scroller.getAttribute("data-bottom-scroll")).toBe("true");

      const computed = getComputedStyle(scroller);

      // The scroll-driven gradient opens with a transparent stop; the fallback opens with black.
      expect(computed.maskImage).toMatch(/^linear-gradient\(rgba\(0, 0, 0, 0\)/);
      expect(computed.webkitMaskImage).toMatch(/^linear-gradient\(rgba\(0, 0, 0, 0\)/);
    });
  });

  it("keeps the shadow size and offset when a style prop is supplied", async () => {
    await render(<Overflowing offset={80} />);

    const computed = getComputedStyle(scrollerOf());

    expect(computed.getPropertyValue("--scroll-shadow-size").trim()).toBe(`${SHADOW_SIZE}px`);
    expect(computed.getPropertyValue("--scroll-shadow-offset").trim()).toBe("80px");
    expect(computed.height).toBe(`${VIEWPORT}px`);
  });

  // The inline axis drives Tabs' scroller, which is the common non-overflowing case.
  describe.skipIf(!supportsScrollTimelines)("horizontal orientation", () => {
    it("fades only the end edge while resting at the start", async () => {
      await render(<OverflowingRow />);

      await expect
        .poll(() => fadesOf(scrollerOf()))
        .toEqual({start: "0px", end: `${SHADOW_SIZE}px`});
    });

    it("fades only the start edge at the end of the scroll range", async () => {
      await render(<OverflowingRow />);

      const scroller = scrollerOf();

      scroller.scrollLeft = maxScrollLeftOf(scroller);

      await expect.poll(() => fadesOf(scroller)).toEqual({start: `${SHADOW_SIZE}px`, end: "0px"});
    });

    it("renders no fade when the content fits", async () => {
      await render(<FittingRow />);

      await nextFrames();

      expect(fadesOf(scrollerOf())).toEqual({start: "0px", end: "0px"});
    });

    // Inline-axis progress runs right-to-left in RTL, so the physical gradient has to flip
    // or the start fade would be painted on the wrong edge.
    it("points the gradient at the left edge in LTR", async () => {
      await render(<OverflowingRow dir="ltr" />);

      await nextFrames();

      expect(getComputedStyle(scrollerOf()).maskImage).toContain("90deg");
    });

    it("flips the gradient to the right edge in RTL", async () => {
      await render(<OverflowingRow dir="rtl" />);

      await nextFrames();

      expect(getComputedStyle(scrollerOf()).maskImage).toContain("270deg");
    });

    it("still fades only the end edge while resting at the start in RTL", async () => {
      await render(<OverflowingRow dir="rtl" />);

      await expect
        .poll(() => fadesOf(scrollerOf()))
        .toEqual({start: "0px", end: `${SHADOW_SIZE}px`});
    });
  });

  describe("disabled detection", () => {
    it.each(["vertical", "horizontal"] as const)(
      "supports disabling and re-enabling an overflowing %s container",
      async (orientation) => {
        const fixture = (isEnabled: boolean, visibility: "auto" | "both" = "auto") => (
          <ScrollShadow
            data-testid="scroller"
            isEnabled={isEnabled}
            orientation={orientation}
            style={{height: VIEWPORT, width: VIEWPORT}}
            visibility={visibility}
          >
            <div style={{height: 1200, width: 1200}}>Overflowing content</div>
          </ScrollShadow>
        );
        const screen = await render(fixture(true));
        const scroller = scrollerOf();
        const endAttribute =
          orientation === "vertical" ? "data-bottom-scroll" : "data-right-scroll";

        await expect.poll(() => scroller.getAttribute(endAttribute)).toBe("true");
        await screen.rerender(fixture(false));
        await nextFrames();
        expect(scroller).not.toHaveAttribute(endAttribute);
        expect(getComputedStyle(scroller).maskImage).toBe("none");

        await screen.rerender(fixture(true));
        await expect.poll(() => scroller.getAttribute(endAttribute)).toBe("true");
        await expect.poll(() => getComputedStyle(scroller).maskImage).not.toBe("none");

        // Disabling automatic detection must preserve explicitly controlled shadows.
        await screen.rerender(fixture(false, "both"));
        await nextFrames();
        expect(scroller).toHaveAttribute(
          orientation === "vertical" ? "data-top-bottom-scroll" : "data-left-right-scroll",
          "true",
        );
        expect(getComputedStyle(scroller).maskImage).not.toBe("none");
      },
    );

    it("renders no fade when detection is turned off", async () => {
      await render(
        <ScrollShadow
          data-testid="scroller"
          isEnabled={false}
          size={SHADOW_SIZE}
          style={{height: VIEWPORT}}
        >
          <div style={{height: 1200}}>Tall content</div>
        </ScrollShadow>,
      );

      const scroller = scrollerOf();

      expect(scroller).toHaveAttribute("data-scroll-shadow-mode", "manual");

      await nextFrames();

      expect(getComputedStyle(scroller).maskImage).toBe("none");
    });
  });

  describe("controlled visibility", () => {
    it("keeps using the attribute-driven mask", async () => {
      await render(
        <ScrollShadow data-testid="scroller" size={SHADOW_SIZE} visibility="both">
          <div style={{height: 20}}>Short content</div>
        </ScrollShadow>,
      );

      const scroller = scrollerOf();

      expect(scroller).toHaveAttribute("data-scroll-shadow-mode", "manual");

      // The fallback gradient opens with black; the scroll-driven one opens transparent.
      expect(getComputedStyle(scroller).maskImage).toMatch(/^linear-gradient\(rgb\(0, 0, 0\)/);
    });
  });
});
