import {forwardRef} from "react";

import {RadioGroupProvider} from "./radio-group-context";
import {UseRadioGroupProps, useRadioGroup} from "./use-radio-group";

export interface RadioGroupProps extends Omit<UseRadioGroupProps, "ref" | "defaultChecked"> {}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    Component,
    children,
    label,
    context,
    description,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  } = useRadioGroup({ref, ...props});

  return (
    <Component {...getGroupProps()}>
      {label && <span {...getLabelProps()}>{label}</span>}
      <div {...getWrapperProps()}>
        <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
      </div>
      {errorMessage ? (
        <div {...getErrorMessageProps()}>{errorMessage}</div>
      ) : description ? (
        <div {...getDescriptionProps()}>{description}</div>
      ) : null}
    </Component>
  );
});

RadioGroup.displayName = "NextUI.RadioGroup";

export default RadioGroup;
