import type {CSSProperties} from "react";

import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Switch} from "@/components/switch";

import "@/styles.css";

const directions = [
  {name: "LTR", dir: "ltr", direction: "ltr"},
  {name: "HTML RTL", dir: "rtl", direction: "rtl"},
  {name: "CSS RTL overriding HTML LTR", dir: "ltr", direction: "rtl"},
] as const;

const SwitchFixture = ({
  defaultSelected,
  dir,
  direction,
  size,
  width,
}: {
  defaultSelected?: boolean;
  dir: "ltr" | "rtl";
  direction: CSSProperties["direction"];
  size: "sm" | "md" | "lg";
  width?: string;
}) => (
  <div dir={dir} style={dir === direction ? undefined : {direction}}>
    <Switch defaultSelected={defaultSelected} size={size}>
      <Switch.Content>
        <Switch.Control data-testid="track" style={{width}}>
          <Switch.Thumb data-testid="thumb" />
        </Switch.Control>
        Enable notifications
      </Switch.Content>
    </Switch>
  </div>
);

const thumbGap = (side: "left" | "right") => {
  const track = page.getByTestId("track").element().getBoundingClientRect();
  const thumb = page.getByTestId("thumb").element().getBoundingClientRect();

  return side === "left" ? thumb.left - track.left : track.right - thumb.right;
};

const expectedGap = () =>
  Number.parseFloat(getComputedStyle(page.getByTestId("thumb").element()).marginInlineStart);

describe("Switch (browser)", () => {
  for (const {dir, direction, name} of directions) {
    describe(name, () => {
      for (const size of ["sm", "md", "lg"] as const) {
        for (const width of [undefined, "4rem"]) {
          it(`supports both thumb endpoints at size ${size} with ${width ?? "default"} track width`, async () => {
            await render(
              <SwitchFixture dir={dir} direction={direction} size={size} width={width} />,
            );

            const control = page.getByRole("switch", {name: "Enable notifications"});
            const start = direction === "rtl" ? "right" : "left";
            const end = direction === "rtl" ? "left" : "right";
            const gap = expectedGap();

            expect(thumbGap(start)).toBeCloseTo(gap, 1);

            await page.getByText("Enable notifications").click();

            await expect.element(control).toBeChecked();
            await expect.poll(() => thumbGap(end)).toBeCloseTo(gap, 1);

            await page.getByText("Enable notifications").click();

            await expect.element(control).not.toBeChecked();
            await expect.poll(() => thumbGap(start)).toBeCloseTo(gap, 1);
          });
        }
      }
    });
  }

  it("supports resizing a selected track with inherited CSS RTL", async () => {
    await render(<SwitchFixture defaultSelected dir="ltr" direction="rtl" size="md" />);

    const track = page.getByTestId("track").element() as HTMLElement;
    const gap = expectedGap();

    expect(thumbGap("left")).toBeCloseTo(gap, 1);

    track.style.width = "4rem";

    await expect.poll(() => thumbGap("left")).toBeCloseTo(gap, 1);
  });

  it("supports intermediate thumb positions without changing its dimensions or margin", async () => {
    await render(<SwitchFixture dir="ltr" direction="ltr" size="md" width="4rem" />);

    const thumb = page.getByTestId("thumb").element();
    const initial = thumb.getBoundingClientRect();
    const margin = getComputedStyle(thumb).marginInlineStart;

    await page.getByText("Enable notifications").click();

    const animations = thumb.getAnimations();

    expect(animations.length).toBeGreaterThan(0);

    for (const animation of animations) {
      animation.pause();
      animation.currentTime = 150;
    }

    const intermediate = thumb.getBoundingClientRect();

    expect(intermediate.left).toBeGreaterThan(initial.left);
    expect(thumbGap("right")).toBeGreaterThan(expectedGap());
    expect(intermediate.width).toBe(initial.width);
    expect(intermediate.height).toBe(initial.height);
    expect(getComputedStyle(thumb).marginInlineStart).toBe(margin);

    for (const animation of animations) animation.finish();

    expect(thumbGap("right")).toBeCloseTo(expectedGap(), 1);
  });
});
