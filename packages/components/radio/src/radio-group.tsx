"use client";

import {forwardRef} from "@nextui-org/system";

import {RadioGroupProvider} from "./radio-group-context";
import {UseRadioGroupProps, useRadioGroup} from "./use-radio-group";

export interface RadioGroupProps extends Omit<UseRadioGroupProps, "ref"> {}

const RadioGroup = forwardRef<RadioGroupProps, "div">((props, ref) => {
  const {Component, children, label, context, getGroupProps, getLabelProps, getWrapperProps} =
    useRadioGroup({ref, ...props});

  return (
    <Component {...getGroupProps()}>
      {label && <label {...getLabelProps()}>{label}</label>}
      <div {...getWrapperProps()}>
        <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
      </div>
    </Component>
  );
});

RadioGroup.displayName = "NextUI.RadioGroup";

export default RadioGroup;
