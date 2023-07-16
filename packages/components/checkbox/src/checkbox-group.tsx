import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";

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

  const memoizedProvider = useMemo(
    () => <CheckboxGroupProvider value={context}>{children}</CheckboxGroupProvider>,
    [context],
  );

  return (
    <div {...getGroupProps()}>
      {label && <span {...getLabelProps()}>{label}</span>}
      <div {...getWrapperProps()}>{memoizedProvider}</div>
      {errorMessage ? (
        <div {...getErrorMessageProps()}>{errorMessage}</div>
      ) : description ? (
        <div {...getDescriptionProps()}>{description}</div>
      ) : null}
    </div>
  );
});

CheckboxGroup.displayName = "NextUI.CheckboxGroup";

export default CheckboxGroup;
