import {forwardRef} from "@nextui-org/system";
import {Tooltip} from "@nextui-org/tooltip";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {UseSliderThumbProps, useSliderThumb} from "./use-slider-thumb";

export interface SliderThumbProps extends UseSliderThumbProps {}

const SliderThumb = forwardRef<"div", SliderThumbProps>((props, ref) => {
  const {
    Component,
    index,
    renderThumb,
    showTooltip,
    getTooltipProps,
    getThumbProps,
    getInputProps,
  } = useSliderThumb({
    ...props,
    ref,
  });

  const thumbProps = {
    ...getThumbProps(),
    children: (
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
    ),
  };

  const content = (
    renderThumb && typeof renderThumb === "function" && index !== undefined ? (
      renderThumb(thumbProps, index)
    ) : (
      <Component {...thumbProps} />
    )
  ) as React.ReactElement;

  return showTooltip ? <Tooltip {...getTooltipProps()}>{content}</Tooltip> : content;
});

SliderThumb.displayName = "NextUI.SliderThumb";

export default SliderThumb;
