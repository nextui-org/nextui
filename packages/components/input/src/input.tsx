import {forwardRef} from "@nextui-org/system";

import {UseInputProps, useInput} from "./use-input";

export interface InputProps extends Omit<UseInputProps, "ref"> {}

const Input = forwardRef<InputProps, "input">((props, ref) => {
  const {
    Component,
    label,
    description,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInputWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  } = useInput({ref, ...props});

  const labelContent = <label {...getLabelProps()}>{label}</label>;

  return (
    <Component {...getBaseProps()}>
      {shouldLabelBeOutside ? labelContent : null}
      <div {...getInputWrapperProps()}>
        {shouldLabelBeInside ? labelContent : null}
        <input {...getInputProps()} />
      </div>
      {description && <div {...getDescriptionProps()}>{description}</div>}
      {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
    </Component>
  );
});

Input.displayName = "NextUI.Input";

export default Input;
