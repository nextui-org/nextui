import type {HTMLAttributes, ReactElement, ReactNode} from "react";
import type {GroupDOMAttributes} from "@react-types/shared";

import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {dataAttr} from "@nextui-org/shared-utils";

// TODO: Use HelpTextProps from "@react-types/shared"; once we upgrade react-aria packages to the latest version.
export interface ValidationResult {
  /** Whether the input value is invalid. */
  isInvalid: boolean;
  /** The current error messages for the input if it is invalid, otherwise an empty array. */
  validationErrors: string[];
  /** The native validation details for the input. */
  validationDetails: ValidityState;
}

export interface DateInputGroupProps extends ValidationResult {
  children?: ReactElement | ReactElement[];
  shouldLabelBeOutside?: boolean;
  label?: ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  groupProps?: GroupDOMAttributes;
  wrapperProps?: HTMLAttributes<HTMLElement>; // <- inner wrapper props
  helperWrapperProps?: HTMLAttributes<HTMLElement>;
  labelProps?: HTMLAttributes<HTMLElement>;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  /** A description for the field. Provides a hint such as specific requirements for what to choose. */
  description?: ReactNode;
  /** An error message for the field. */
  errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
}

export const DateInputGroup = forwardRef<"div", DateInputGroupProps>((props, ref) => {
  const {
    as,
    label,
    children,
    description,
    startContent,
    endContent,
    errorMessage: errorMessageProp,
    shouldLabelBeOutside,
    isInvalid,
    groupProps,
    labelProps,
    wrapperProps,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    validationDetails,
    ...otherProps
  } = props;

  const Component = as || "div";

  const labelContent = label ? <span {...labelProps}>{label}</span> : null;

  const errorMessage =
    typeof errorMessageProp === "function"
      ? errorMessageProp({
          isInvalid,
          validationErrors,
          validationDetails,
        })
      : errorMessageProp || validationErrors?.join(" ");

  const hasHelper = !!description || !!errorMessage;

  const helperWrapper = useMemo(() => {
    if (!hasHelper) return null;

    return (
      <div {...helperWrapperProps}>
        {isInvalid && errorMessage ? (
          <div {...errorMessageProps}>{errorMessage}</div>
        ) : description ? (
          <div {...descriptionProps}>{description}</div>
        ) : null}
      </div>
    );
  }, [
    hasHelper,
    errorMessage,
    description,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps,
  ]);

  return (
    <Component {...otherProps} ref={ref} data-has-helper={dataAttr(hasHelper)}>
      {shouldLabelBeOutside ? labelContent : null}
      <div {...groupProps}>
        {!shouldLabelBeOutside ? labelContent : null}
        <div {...wrapperProps}>
          {startContent}
          {children}
          {endContent}
        </div>
        {shouldLabelBeOutside ? helperWrapper : null}
      </div>
      {!shouldLabelBeOutside ? helperWrapper : null}
    </Component>
  );
});

DateInputGroup.displayName = "NextUI.DateInputGroup";
