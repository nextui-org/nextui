import {AriaProgressBarProps} from "@react-types/progress";
import {clamp, filterDOMProps, mergeProps} from "@react-aria/utils";
import {DOMAttributes} from "@react-types/shared";
import {useLabel} from "@nextui-org/aria-utils";
import {useNumberFormatter} from "@react-aria/i18n";

export interface ProgressBarAria {
  /** Props for the progress bar container element. */
  progressBarProps: DOMAttributes;
  /** Props for the progress bar's visual label element (if any). */
  labelProps: DOMAttributes;
}

/**
 * Provides the accessibility implementation for a progress bar component.
 * Progress bars show either determinate or indeterminate progress of an operation
 * over time.
 */
export function useProgressBar(props: AriaProgressBarProps): ProgressBarAria {
  let {
    value = 0,
    minValue = 0,
    maxValue = 100,
    valueLabel,
    isIndeterminate,
    formatOptions = {
      style: "percent",
    },
  } = props;

  const domProps = filterDOMProps(props, {labelable: true});
  const {labelProps, fieldProps} = useLabel({
    ...props,
    // Progress bar is not an HTML input element so it
    // shouldn't be labeled by a <label> element.
    labelElementType: "span",
  });

  value = clamp(value, minValue, maxValue);
  const percentage = (value - minValue) / (maxValue - minValue);
  const formatter = useNumberFormatter(formatOptions);

  if (!isIndeterminate && !valueLabel) {
    const valueToFormat = formatOptions.style === "percent" ? percentage : value;

    valueLabel = formatter.format(valueToFormat);
  }

  return {
    progressBarProps: mergeProps(domProps, {
      ...fieldProps,
      "aria-valuenow": isIndeterminate ? undefined : value,
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-valuetext": isIndeterminate ? undefined : (valueLabel as string),
      role: "progressbar",
    }),
    labelProps,
  };
}
