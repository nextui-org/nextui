import {forwardRef} from "@nextui-org/system";
import {Drip} from "@nextui-org/drip";

import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends Omit<UseButtonProps, "ref"> {}

const Button = forwardRef<ButtonProps, "button">((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    leftIcon,
    rightIcon,
    disableRipple,
    dripBindings,
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
      {!disableRipple && (
        <Drip
          {...dripBindings}
          styles={{
            base: "opacity-30",
            svg: "text-inherit",
          }}
        />
      )}
    </Component>
  );
});

Button.displayName = "NextUI.Button";

export default Button;
