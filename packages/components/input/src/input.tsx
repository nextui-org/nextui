import {forwardRef} from "@nextui-org/system";
import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo} from "react";

import {UseInputProps, useInput} from "./use-input";

export interface InputProps extends Omit<UseInputProps, "ref" | "isClearButtonFocusVisible"> {}

const Input = forwardRef<InputProps, "input">((props, ref) => {
  const {
    Component,
    label,
    description,
    isClearable,
    startContent,
    endContent,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  } = useInput({ref, ...props});

  const labelContent = <label {...getLabelProps()}>{label}</label>;

  const end = useMemo(() => {
    if (isClearable) {
      return <span {...getClearButtonProps()}>{endContent || <CloseFilledIcon />}</span>;
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

  const innerWrapper = useMemo(() => {
    if (startContent || end) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getInputProps()} />
          {end}
        </div>
      );
    }

    return <input {...getInputProps()} />;
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  return (
    <Component {...getBaseProps()}>
      {shouldLabelBeOutside ? labelContent : null}
      <div {...getInputWrapperProps()}>
        {shouldLabelBeInside ? labelContent : null}
        {innerWrapper}
      </div>
      {description && <div {...getDescriptionProps()}>{description}</div>}
      {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
    </Component>
  );
});

Input.displayName = "NextUI.Input";

export default Input;
