import {forwardRef} from "@nextui-org/system";

import Thumb from "./slider-thumb";
import {UseSliderProps, useSlider} from "./use-slider";

export interface SliderProps extends Omit<UseSliderProps, "isVertical"> {}

const Slider = forwardRef<"div", SliderProps>((props, ref) => {
  const {
    Component,
    state,
    label,
    steps,
    startContent,
    endContent,
    getStepProps,
    getBaseProps,
    getTrackWrapperProps,
    getLabelWrapperProps,
    getLabelProps,
    getOutputProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
    getStartContentProps,
    getEndContentProps,
  } = useSlider({...props, ref});

  return (
    <Component {...getBaseProps()}>
      {label && (
        <div {...getLabelWrapperProps()}>
          <label {...getLabelProps()}>{label}</label>
          <output {...getOutputProps()} />
        </div>
      )}
      <div {...getTrackWrapperProps()}>
        {startContent && <div {...getStartContentProps()}>{startContent}</div>}
        <div {...getTrackProps()}>
          <div {...getFillerProps()} />
          {Number.isFinite(steps) &&
            Array.from({length: steps}, (_, index) => <div key={index} {...getStepProps(index)} />)}
          {state.values.map((_, index) => (
            <Thumb key={index} {...getThumbProps(index)} />
          ))}
        </div>
        {endContent && <div {...getEndContentProps()}>{endContent}</div>}
      </div>
    </Component>
  );
});

Slider.displayName = "NextUI.Slider";

export default Slider;
