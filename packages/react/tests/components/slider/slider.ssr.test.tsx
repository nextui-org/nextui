import {ssrSmoke} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Slider} from "@/components/slider";

import {SliderIndicatorsFixture} from "./fixtures";

describe("Slider SSR", () => {
  it("renders without hydration mismatch with a default value", async () => {
    const {html} = await ssrSmoke(
      <Slider data-testid="slider" defaultValue={30}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>,
    );

    expect(html).toContain('data-slot="slider"');
    expect(html).toContain('data-slot="slider-thumb"');
  });

  it("renders steps and marks without hydration mismatch", async () => {
    const {html} = await ssrSmoke(<SliderIndicatorsFixture defaultValue={[25, 75]} />);

    expect(html).toContain('data-slot="slider-steps"');
    expect(html).toContain('data-slot="slider-step"');
    expect(html).toContain('data-slot="slider-marks"');
    expect(html).toContain('data-slot="slider-mark"');
  });
});
