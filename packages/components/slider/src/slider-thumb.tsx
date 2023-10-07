import {forwardRef} from "@nextui-org/system";
import {Tooltip} from "@nextui-org/tooltip";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {UseSliderThumbProps, useSliderThumb} from "./use-slider-thumb";

export interface SliderThumbProps extends UseSliderThumbProps {}

const SliderThumb = forwardRef<"div", SliderThumbProps>((props, ref) => {
  const {Component, showTooltip, getTooltipProps, getThumbProps, getInputProps} = useSliderThumb({
    ...props,
    ref,
  });

  const content = (
    <Component {...getThumbProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
    </Component>
  );

  return showTooltip ? <Tooltip {...getTooltipProps()}>{content}</Tooltip> : content;
});

SliderThumb.displayName = "NextUI.SliderThumb";

export default SliderThumb;
