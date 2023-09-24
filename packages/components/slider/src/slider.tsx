import {forwardRef} from "@nextui-org/system";
import {Fragment} from "react";

import Thumb from "./slider-thumb";
import {UseSliderProps, useSlider} from "./use-slider";

export interface SliderProps extends Omit<UseSliderProps, "isRangeSlider"> {}

const Slider = forwardRef<"div", SliderProps>((props, ref) => {
  const {
    Component,
    state,
    label,
    getBaseProps,
    getLabelWrapperProps,
    getLabelProps,
    getOutputProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
  } = useSlider({...props, ref});

  return (
    <Component {...getBaseProps()}>
      {label && (
        <div {...getLabelWrapperProps()}>
          <label {...getLabelProps()}>{label}</label>
          <output {...getOutputProps()}>
            {state.values.map((_, index) => (
              <Fragment key={index}>
                {index > 0 && " - "}
                {state.getThumbValueLabel(index)}
              </Fragment>
            ))}
          </output>
        </div>
      )}
      <div {...getTrackProps()}>
        <div {...getFillerProps()} />
        {state.values.map((_, index) => (
          <Thumb key={index} {...getThumbProps(index)} />
        ))}
      </div>
    </Component>
  );
});

Slider.displayName = "NextUI.Slider";

export default Slider;
