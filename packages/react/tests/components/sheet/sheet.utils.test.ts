import {
  animateSheetValue,
  nearestSheetSnap,
  sheetDismissTarget,
  sheetReleaseEase,
} from "@/components/sheet/sheet.utils";

// Numerical policy tests: layout and native scroll physics are covered in the browser suite.
describe("Sheet", () => {
  describe("snap selection", () => {
    it.each([
      {current: 200, velocity: 0, expected: 150},
      {current: 240, velocity: 0, expected: 300},
      {current: 200, velocity: -0.5, expected: 300},
      {current: 240, velocity: 0.5, expected: 150},
      {current: 0, velocity: 1, expected: 0},
      {current: 300, velocity: -1, expected: 300},
      {current: 149.8, velocity: -1, expected: 300},
      {current: 150.2, velocity: 1, expected: 0},
    ])(
      "supports directional snapping from $current at velocity $velocity",
      ({current, expected, velocity}) => {
        expect(nearestSheetSnap([0, 150, 300], current, velocity)).toBe(expected);
      },
    );
    it("supports an empty target list and a single target", () => {
      expect(nearestSheetSnap([], 100, 0)).toBeNull();
      expect(nearestSheetSnap([200], 100, 0)).toBe(200);
    });
  });

  describe("dismissal policy", () => {
    const defaults = {
      current: 760,
      elapsed: 500,
      extent: 800,
      isDismissable: true,
      placement: "bottom" as const,
      rest: 800,
      size: 300,
      travel: 40,
      viewport: 800,
    };

    it("supports snapping back below the distance and velocity thresholds", () => {
      expect(sheetDismissTarget(defaults)).toBe(800);
    });
    it.each(["bottom", "right", "top", "left"] as const)(
      "supports the physical dismissal direction for %s",
      (placement) => {
        const forward = placement === "bottom" || placement === "right";
        const rest = forward ? 800 : 0;

        expect(
          sheetDismissTarget({
            ...defaults,
            placement,
            rest,
            current: forward ? 700 : 100,
            travel: forward ? 100 : -100,
          }),
        ).toBe(forward ? 0 : 800);
        expect(
          sheetDismissTarget({
            ...defaults,
            placement,
            rest,
            current: rest,
            travel: forward ? -100 : 100,
          }),
        ).toBe(rest);
      },
    );
    it("supports fast flicks, zero duration, and exact threshold distances", () => {
      expect(sheetDismissTarget({...defaults, elapsed: 50})).toBe(0);
      expect(sheetDismissTarget({...defaults, elapsed: 0})).toBe(800);
      expect(sheetDismissTarget({...defaults, travel: 75})).toBe(0);
      expect(sheetDismissTarget({...defaults, travel: 74})).toBe(800);
    });
    it("supports non-dismissable sheets even after a fast or long drag", () => {
      expect(sheetDismissTarget({...defaults, elapsed: 1, isDismissable: false, travel: 600})).toBe(
        800,
      );
    });
    it("supports viewport-sized thresholds and missing measurements", () => {
      expect(sheetDismissTarget({...defaults, size: 1000, viewport: 200, travel: 50})).toBe(0);
      expect(sheetDismissTarget({...defaults, size: 0, travel: 100})).toBe(800);
      expect(sheetDismissTarget({...defaults, size: 0, elapsed: 20})).toBe(0);
      expect(
        sheetDismissTarget({
          ...defaults,
          extent: -1,
          placement: "top",
          rest: 0,
          current: 100,
          travel: -100,
        }),
      ).toBe(0);
    });
  });

  describe("release animation", () => {
    it("supports bounded, monotonic easing with exact endpoints", () => {
      expect(sheetReleaseEase(-1)).toBe(0);
      expect(sheetReleaseEase(0)).toBe(0);
      expect(sheetReleaseEase(1)).toBe(1);
      expect(sheetReleaseEase(2)).toBe(1);
      let previous = 0;

      for (let step = 1; step <= 100; step++) {
        const value = sheetReleaseEase(step / 100);

        expect(value).toBeGreaterThanOrEqual(previous);
        expect(value).toBeLessThanOrEqual(1);
        previous = value;
      }
      expect(sheetReleaseEase(0.5)).toBeGreaterThan(0.5);
    });

    let frames: FrameRequestCallback[];

    beforeEach(() => {
      frames = [];
      vi.spyOn(performance, "now").mockReturnValue(1000);
      vi.stubGlobal(
        "requestAnimationFrame",
        vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
      );
      vi.stubGlobal("cancelAnimationFrame", vi.fn());
    });
    afterEach(() => {
      vi.restoreAllMocks();
      vi.unstubAllGlobals();
    });

    it("calls updates toward either target and completes only at the endpoint", () => {
      for (const [from, to] of [
        [0, 400],
        [400, 0],
      ] as const) {
        const update = vi.fn();
        const complete = vi.fn();

        animateSheetValue(from, to, update, complete, false);
        frames.at(-1)?.(1000);
        expect(update).toHaveBeenLastCalledWith(from);
        frames.at(-1)?.(1250);
        const halfway = update.mock.lastCall![0] as number;

        expect(Math.abs(to - halfway)).toBeLessThan(Math.abs(to - from) / 2);
        expect(complete).not.toHaveBeenCalled();
        frames.at(-1)?.(1500);
        expect(update).toHaveBeenLastCalledWith(to);
        expect(complete).toHaveBeenCalledTimes(1);
      }
    });

    it("supports cancellation without updates or completion from stale frames", () => {
      const update = vi.fn();
      const complete = vi.fn();
      const cancel = animateSheetValue(0, 100, update, complete, false);

      cancel();
      expect(frames).toHaveLength(1);
      frames[0]!(1600);
      expect(cancelAnimationFrame).toHaveBeenCalled();
      expect(update).not.toHaveBeenCalled();
      expect(complete).not.toHaveBeenCalled();
    });

    it.each([
      {from: 0, to: 100, reduced: true},
      {from: 10, to: 10.2, reduced: false},
    ])(
      "supports immediate completion for $from to $to with reduced motion $reduced",
      ({from, reduced, to}) => {
        const update = vi.fn();
        const complete = vi.fn();
        const cancel = animateSheetValue(from, to, update, complete, reduced);

        expect(update).toHaveBeenCalledExactlyOnceWith(to);
        expect(complete).toHaveBeenCalledTimes(1);
        expect(requestAnimationFrame).not.toHaveBeenCalled();
        cancel();
      },
    );
  });
});
