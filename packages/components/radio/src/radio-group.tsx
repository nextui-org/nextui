import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";

import {RadioGroupProvider} from "./radio-group-context";
import {UseRadioGroupProps, useRadioGroup} from "./use-radio-group";

export interface RadioGroupProps extends Omit<UseRadioGroupProps, "ref" | "defaultChecked"> {}

const RadioGroup = forwardRef<RadioGroupProps, "div">((props, ref) => {
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

  const memoizedProvider = useMemo(
    () => <RadioGroupProvider value={context}>{children}</RadioGroupProvider>,
    [context],
  );

  return (
    <Component {...getGroupProps()}>
      {label && <label {...getLabelProps()}>{label}</label>}
      <div {...getWrapperProps()}>{memoizedProvider}</div>
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
