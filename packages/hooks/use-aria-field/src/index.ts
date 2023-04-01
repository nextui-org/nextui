// based on @react-aria/use-field hook, but with useId from react 18
// thanks to @adobe/react-spectrum for the great work ❤️

import {DOMAttributes, HelpTextProps, Validation} from "@react-types/shared";
import {mergeProps} from "@react-aria/utils";
import {LabelAria, LabelAriaProps, useAriaLabel} from "@nextui-org/use-aria-label";
import {useAriaSlotId} from "@nextui-org/use-aria-slot-id";

export interface FieldAria extends LabelAria {
  /** Props for the description element, if any. */
  descriptionProps: DOMAttributes;
  /** Props for the error message element, if any. */
  errorMessageProps: DOMAttributes;
}

export interface UseAriaFieldProps
  extends LabelAriaProps,
    HelpTextProps,
    Omit<Validation, "isRequired"> {}

export function useAriaField(props: UseAriaFieldProps = {}): FieldAria {
  let {description, errorMessage, validationState} = props;
  let {labelProps, fieldProps} = useAriaLabel(props);

  let descriptionId = useAriaSlotId([Boolean(description), Boolean(errorMessage), validationState]);
  let errorMessageId = useAriaSlotId([
    Boolean(description),
    Boolean(errorMessage),
    validationState,
  ]);

  fieldProps = mergeProps(fieldProps, {
    "aria-describedby":
      [
        descriptionId,
        // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA. See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
        errorMessageId,
        props["aria-describedby"],
      ]
        .filter(Boolean)
        .join(" ") || undefined,
  });

  return {
    labelProps,
    fieldProps,
    descriptionProps: {
      id: descriptionId,
    },
    errorMessageProps: {
      id: errorMessageId,
    },
  };
}

export type UseAriaFieldReturn = ReturnType<typeof useAriaField>;
