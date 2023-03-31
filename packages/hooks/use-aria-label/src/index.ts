import {useId} from "react";
import {AriaLabelingProps, DOMAttributes, DOMProps, LabelableProps} from "@react-types/shared";
import {ElementType, LabelHTMLAttributes} from "react";
import {useLabels} from "@react-aria/utils";

export interface LabelAriaProps extends LabelableProps, DOMProps, AriaLabelingProps {
  /**
   * The HTML element used to render the label, e.g. 'label', or 'span'.
   * @default 'label'
   */
  labelElementType?: ElementType;
}

export interface LabelAria {
  /** Props to apply to the label container element. */
  labelProps: DOMAttributes | LabelHTMLAttributes<HTMLLabelElement>;
  /** Props to apply to the field container element being labeled. */
  fieldProps: AriaLabelingProps & DOMProps;
}

/**
 * Provides the accessibility implementation for labels and their associated elements.
 * Labels provide context for user inputs.
 * @param props - The props for labels and fields.
 */
export function useAriaLabel(props: LabelAriaProps): LabelAria {
  let {
    label,
    id: idProp,
    "aria-labelledby": ariaLabelledby,
    "aria-label": ariaLabel,
    labelElementType = "label",
  } = props;

  const reactId = useId();
  const id = idProp || reactId;
  const labelId = useId();

  let labelProps = {};

  if (label) {
    ariaLabelledby = ariaLabelledby ? `${ariaLabelledby} ${labelId}` : labelId;
    labelProps = {
      id: labelId,
      htmlFor: labelElementType === "label" ? id : undefined,
    };
  } else if (!ariaLabelledby && !ariaLabel) {
    // eslint-disable-next-line no-console
    console.warn(
      "If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility",
    );
  }

  const fieldProps = useLabels({
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  });

  return {
    labelProps,
    fieldProps,
  };
}
