import {forwardRef} from "@nextui-org/system";

import {UseInputProps, useInput} from "./use-input";

export interface InputProps extends Omit<UseInputProps, "ref"> {}

const Input = forwardRef<InputProps, "div">((props, ref) => {
  const {Component, domRef, children, styles, ...otherProps} = useInput({ref, ...props});

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

Input.displayName = "NextUI.Input";

export default Input;
