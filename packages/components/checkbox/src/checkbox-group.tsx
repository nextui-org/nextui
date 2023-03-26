import {forwardRef} from "@nextui-org/system";

import {CheckboxGroupProvider} from "./checkbox-group-context";
import {UseCheckboxGroupProps, useCheckboxGroup} from "./use-checkbox-group";

export interface CheckboxGroupProps extends Omit<UseCheckboxGroupProps, "ref"> {}

const CheckboxGroup = forwardRef<CheckboxGroupProps, "div">((props, ref) => {
  const {children, context, label, getGroupProps, getLabelProps, getWrapperProps} =
    useCheckboxGroup({ref, ...props});

  return (
    <div {...getGroupProps()}>
      {label && <label {...getLabelProps()}>{label}</label>}
      <div {...getWrapperProps()}>
        <CheckboxGroupProvider value={context}>{children}</CheckboxGroupProvider>
      </div>
    </div>
  );
});

CheckboxGroup.displayName = "NextUI.CheckboxGroup";

export default CheckboxGroup;
