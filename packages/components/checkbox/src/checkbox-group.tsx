import {forwardRef} from "@nextui-org/system";
import {memo} from "react";

import {CheckboxGroupProvider} from "./checkbox-group-context";
import {UseCheckboxGroupProps, useCheckboxGroup} from "./use-checkbox-group";

export interface CheckboxGroupProps extends Omit<UseCheckboxGroupProps, "ref"> {}

const CheckboxGroup = forwardRef<CheckboxGroupProps, "div">((props, ref) => {
  const {
    children,
    context,
    label,
    description,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  } = useCheckboxGroup({ref, ...props});

  return (
    <div {...getGroupProps()}>
      {label && <label {...getLabelProps()}>{label}</label>}
      <div {...getWrapperProps()}>
        <CheckboxGroupProvider value={context}>{children}</CheckboxGroupProvider>
      </div>
      {errorMessage ? (
        <div {...getErrorMessageProps()}>{errorMessage}</div>
      ) : description ? (
        <div {...getDescriptionProps()}>{description}</div>
      ) : null}
    </div>
  );
});

CheckboxGroup.displayName = "NextUI.CheckboxGroup";

export default memo(CheckboxGroup);
