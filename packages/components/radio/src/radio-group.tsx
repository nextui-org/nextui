import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";

import {RadioGroupProvider} from "./radio-group-context";
import {UseRadioGroupProps, useRadioGroup} from "./use-radio-group";

export interface RadioGroupProps extends Omit<UseRadioGroupProps, "defaultChecked"> {}

const RadioGroup = forwardRef<"div", RadioGroupProps>((props, ref) => {
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
  } = useRadioGroup({...props, ref});

  const errorMessageContent = useMemo(() => {
    if (typeof errorMessage === "string") {
      return errorMessage;
    }
  }, [errorMessage]);

  return (
    <Component {...getGroupProps()}>
      {label && <span {...getLabelProps()}>{label}</span>}
      <div {...getWrapperProps()}>
        <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
      </div>
      {errorMessage ? (
        <div {...getErrorMessageProps()}>{errorMessageContent}</div>
      ) : description ? (
        <div {...getDescriptionProps()}>{description}</div>
      ) : null}
    </Component>
  );
});

RadioGroup.displayName = "NextUI.RadioGroup";

export default RadioGroup;
