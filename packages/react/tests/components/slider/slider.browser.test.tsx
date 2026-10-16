import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {I18nProvider} from "@/components/rac";
import {Slider} from "@/components/slider";

import {SliderIndicatorsFixture} from "./fixtures";

import "@/styles.css";

describe("Slider (browser)", () => {
  it("supports switching locale after mounting without splitting the track fill", async () => {
    const fixture = (rtl: boolean) => (
      <I18nProvider locale={rtl ? "ar-AE" : "en-US"}>
        <div dir={rtl ? "rtl" : "ltr"} style={{width: 320}}>
          <Slider aria-label="Volume" defaultValue={14}>
            <Slider.Track>
              <Slider.Fill />
              <Slider.Steps />
              <Slider.Thumb />
            </Slider.Track>
            <Slider.Marks>
              <Slider.Mark value={0} />
              <Slider.Mark value={100} />
            </Slider.Marks>
          </Slider>
        </div>
      </I18nProvider>
    );
    const view = await render(fixture(false));

    for (const rtl of [true, false]) {
      await view.rerender(fixture(rtl));
      const track = document.querySelector<HTMLElement>('[data-slot="slider-track"]')!;
      const fill = document.querySelector<HTMLElement>('[data-slot="slider-fill"]')!;
      const thumb = document.querySelector<HTMLElement>('[data-slot="slider-thumb"]')!;
      const rect = track.getBoundingClientRect();
      const fillRect = fill.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const css = getComputedStyle(track);
      const start = rtl
        ? rect.right - parseFloat(css.borderRightWidth)
        : rect.left + parseFloat(css.borderLeftWidth);

      expect(Math.abs((rtl ? fillRect.right : fillRect.left) - start)).toBeLessThan(1);
      expect(
        Math.abs((rtl ? fillRect.left : fillRect.right) - (thumbRect.left + thumbRect.width / 2)),
      ).toBeLessThan(1);
      // Check the painted end caps as well as the fill geometry.
      expect(rtl ? css.borderRightColor : css.borderLeftColor).toBe(
        getComputedStyle(fill).backgroundColor,
      );
      expect(rtl ? css.borderLeftColor : css.borderRightColor).toBe("rgba(0, 0, 0, 0)");

      for (const slot of ["step", "mark"]) {
        const bounds = document
          .querySelector(`[data-slot="slider-${slot}"][data-value="0"]`)!
          .getBoundingClientRect();

        expect(Math.abs(bounds.left + bounds.width / 2 - start)).toBeLessThan(1);
      }

      const input = page.getByRole("slider", {name: "Volume"});

      (input.element() as HTMLElement).focus();
      await userEvent.keyboard(rtl ? "{ArrowLeft}" : "{ArrowRight}");
      await expect.element(input).toHaveValue(rtl ? "15" : "16");
    }
  });

  describe.each([
    {direction: "ltr", locale: "en-US"},
    {direction: "rtl", locale: "ar-AE"},
  ] as const)("$direction", ({direction, locale}) => {
    it.each(["horizontal", "vertical"] as const)(
      "renders %s step dots and marks aligned with the track and thumbs",
      async (orientation) => {
        await render(
          <I18nProvider locale={locale}>
            <div dir={direction} style={{height: 300, width: 400}}>
              <SliderIndicatorsFixture defaultValue={[25, 75]} orientation={orientation} />
            </div>
          </I18nProvider>,
        );

        const vertical = orientation === "vertical";
        const track = document.querySelector<HTMLElement>('[data-slot="slider-track"]')!;
        const rect = track.getBoundingClientRect();
        const css = getComputedStyle(track);
        const length = vertical
          ? rect.height - parseFloat(css.borderTopWidth) - parseFloat(css.borderBottomWidth)
          : rect.width - parseFloat(css.borderLeftWidth) - parseFloat(css.borderRightWidth);
        const start = vertical
          ? rect.bottom - parseFloat(css.borderBottomWidth)
          : direction === "rtl"
            ? rect.right - parseFloat(css.borderRightWidth)
            : rect.left + parseFloat(css.borderLeftWidth);
        const center = (element: Element) => {
          const bounds = element.getBoundingClientRect();

          return vertical ? bounds.top + bounds.height / 2 : bounds.left + bounds.width / 2;
        };

        for (const value of [0, 25, 50, 75, 100]) {
          const expected =
            start + ((vertical || direction === "rtl" ? -1 : 1) * length * value) / 100;
          const dot = document.querySelector(`[data-slot="slider-step"][data-value="${value}"]`)!;
          const mark = document.querySelector(`[data-slot="slider-mark"][data-value="${value}"]`)!;

          expect(Math.abs(center(dot) - expected)).toBeLessThan(1);
          expect(Math.abs(center(mark) - expected)).toBeLessThan(1);
          expect(dot.getBoundingClientRect().width).toBeGreaterThan(0);
          expect(dot.getBoundingClientRect().height).toBeGreaterThan(0);
          // Dots stay visible above the fill even when composed before it.
          const dotRect = dot.getBoundingClientRect();
          const dotStyle = getComputedStyle(dot);

          expect(dotStyle.pointerEvents).toBe("none");
          expect(dotRect.left).toBeGreaterThanOrEqual(rect.left);
          expect(dotRect.right).toBeLessThanOrEqual(rect.right);
          if (vertical) {
            expect(
              direction === "rtl"
                ? mark.getBoundingClientRect().right <= rect.left
                : mark.getBoundingClientRect().left >= rect.right,
            ).toBe(true);
          } else {
            expect(mark.getBoundingClientRect().top).toBeGreaterThanOrEqual(rect.bottom);
          }
        }

        const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');

        for (const [index, value] of [25, 75].entries()) {
          const dot = document.querySelector(`[data-slot="slider-step"][data-value="${value}"]`)!;

          expect(Math.abs(center(thumbs[index]!) - center(dot))).toBeLessThan(1);
        }
      },
    );

    it.each([
      {kind: "single", orientation: "horizontal", value: [25]},
      {kind: "range", orientation: "horizontal", value: [20, 60]},
      {kind: "single", orientation: "vertical", value: [25]},
      {kind: "range", orientation: "vertical", value: [20, 60]},
    ] as const)(
      "renders the $orientation $kind fill aligned with its thumbs",
      async ({orientation, value}) => {
        await render(
          <I18nProvider locale={locale}>
            <div dir={direction} style={{height: 300, width: 400}}>
              <Slider aria-label="Volume" defaultValue={[...value]} orientation={orientation}>
                <Slider.Track>
                  {({state}) => (
                    <>
                      <Slider.Fill />
                      {state.values.map((_, index) => (
                        <Slider.Thumb key={index} index={index} />
                      ))}
                    </>
                  )}
                </Slider.Track>
              </Slider>
            </div>
          </I18nProvider>,
        );

        const track = document.querySelector<HTMLElement>('[data-slot="slider-track"]')!;
        const trackRect = track.getBoundingClientRect();
        const trackStyle = getComputedStyle(track);
        const fill = document.querySelector('[data-slot="slider-fill"]')!.getBoundingClientRect();
        const thumbs = Array.from(
          document.querySelectorAll('[data-slot="slider-thumb"]'),
          (thumb) => thumb.getBoundingClientRect(),
        );
        const vertical = orientation === "vertical";
        const reversed = vertical || direction === "rtl";
        const centers = thumbs.map((thumb) =>
          vertical ? thumb.top + thumb.height / 2 : thumb.left + thumb.width / 2,
        );
        const start = vertical
          ? trackRect.bottom - parseFloat(trackStyle.borderBottomWidth)
          : direction === "rtl"
            ? trackRect.right - parseFloat(trackStyle.borderRightWidth)
            : trackRect.left + parseFloat(trackStyle.borderLeftWidth);
        const first = value.length === 1 ? start : centers[0]!;
        const last = centers[centers.length - 1]!;

        expect(fill.width).toBeGreaterThan(0);
        expect(fill.height).toBeGreaterThan(0);
        expect(
          Math.abs((vertical ? fill.top : fill.left) - (reversed ? last : first)),
        ).toBeLessThan(1);
        expect(
          Math.abs((vertical ? fill.bottom : fill.right) - (reversed ? first : last)),
        ).toBeLessThan(1);
      },
    );
  });

  it("supports pointer interaction through dots and updates their filled state", async () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();

    await render(
      <div style={{width: 400}}>
        <SliderIndicatorsFixture defaultValue={0} onChange={onChange} onChangeEnd={onChangeEnd} />
      </div>,
    );

    const track = document.querySelector<HTMLElement>('[data-slot="slider-track"]')!;
    const dot = document.querySelector('[data-slot="slider-step"][data-value="75"]')!;
    const trackRect = track.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();

    await userEvent.click(track, {
      position: {x: dotRect.left + dotRect.width / 2 - trackRect.left, y: trackRect.height / 2},
    });

    await expect.element(page.getByRole("slider", {name: "Volume"})).toHaveValue("75");
    expect(onChange).toHaveBeenLastCalledWith(75);
    expect(onChangeEnd).toHaveBeenLastCalledWith(75);
    expect(dot).toHaveAttribute("data-filled", "true");
    await expect.element(page.getByRole("slider", {name: "Volume"})).toHaveFocus();
  });
});
