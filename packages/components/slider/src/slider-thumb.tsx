import {forwardRef} from "@nextui-org/system";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {UseSliderThumbProps, useSliderThumb} from "./use-slider-thumb";

export interface SliderThumbProps extends UseSliderThumbProps {}

const SliderThumb = forwardRef<"div", SliderThumbProps>((props, ref) => {
  const {Component, getThumbProps, getInputProps} = useSliderThumb({...props, ref});

  return (
    <Component {...getThumbProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
    </Component>
  );
});

SliderThumb.displayName = "NextUI.SliderThumb";

export default SliderThumb;
