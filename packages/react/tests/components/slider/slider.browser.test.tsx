import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {I18nProvider} from "@/components/rac";
import {Slider} from "@/components/slider";

import "@/styles.css";

describe("Slider (browser)", () => {
  it("supports switching locale after mounting without splitting the track fill", async () => {
    const fixture = (rtl: boolean) => (
      <I18nProvider locale={rtl ? "ar-AE" : "en-US"}>
        <div dir={rtl ? "rtl" : "ltr"} style={{width: 320}}>
          <Slider aria-label="Volume" defaultValue={14}>
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
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
    it.each([
      {orientation: "horizontal", kind: "single", value: [25]},
      {orientation: "horizontal", kind: "range", value: [20, 60]},
      {orientation: "vertical", kind: "single", value: [25]},
      {orientation: "vertical", kind: "range", value: [20, 60]},
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
});
