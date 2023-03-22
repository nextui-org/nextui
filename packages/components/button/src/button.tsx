import {Drip} from "@nextui-org/drip";
import {forwardRef} from "@nextui-org/system";

import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends Omit<UseButtonProps, "ref"> {}

const Button = forwardRef<ButtonProps, "button">((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    drips,
    leftIcon,
    rightIcon,
    disableRipple,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  return (
    <Component ref={domRef} className={styles} {...getButtonProps()}>
      {leftIcon}
      {children}
      {rightIcon}
      {!disableRipple && <Drip drips={drips} />}
    </Component>
  );
});

Button.displayName = "NextUI.Button";

export default Button;
