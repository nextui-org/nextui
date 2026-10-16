import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const sliderVariants = tv({
  slots: {
    base: "slider",
    fill: "slider__fill",
    mark: "slider__mark",
    marks: "slider__marks",
    output: "slider__output",
    step: "slider__step",
    steps: "slider__steps",
    thumb: "slider__thumb",
    track: "slider__track",
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
