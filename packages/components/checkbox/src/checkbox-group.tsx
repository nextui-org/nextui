import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";

import {CheckboxGroupProvider} from "./checkbox-group-context";
import {UseCheckboxGroupProps, useCheckboxGroup} from "./use-checkbox-group";

export interface CheckboxGroupProps extends UseCheckboxGroupProps {}

const CheckboxGroup = forwardRef<"div", CheckboxGroupProps>((props, ref) => {
  const {
    children,
    context,
    label,
    description,
    isInvalid,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  } = useCheckboxGroup({...props, ref});

  const errorMessageContent = useMemo(() => errorMessage, [isInvalid]);

  return (
    <div {...getGroupProps()}>
      {label && <span {...getLabelProps()}>{label}</span>}
      <div {...getWrapperProps()}>
        <CheckboxGroupProvider value={context}>{children}</CheckboxGroupProvider>
      </div>
      {isInvalid && errorMessageContent ? (
        <div {...getErrorMessageProps()}>{errorMessageContent}</div>
      ) : description ? (
        <div {...getDescriptionProps()}>{description}</div>
      ) : null}
    </div>
  );
});

CheckboxGroup.displayName = "NextUI.CheckboxGroup";

export default CheckboxGroup;
