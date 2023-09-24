import {forwardRef} from "@nextui-org/system";

import Thumb from "./slider-thumb";
import {UseSliderProps, useSlider} from "./use-slider";

export interface SliderProps extends UseSliderProps {}

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
          <output {...getOutputProps()} />
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
