import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";

import {UseSwitchProps, useSwitch} from "./use-switch";

export interface SwitchProps extends Omit<UseSwitchProps, "ref"> {}

const Switch = forwardRef<SwitchProps, "div">((props, ref) => {
  const {Component, domRef, children, styles, ...otherProps} = useSwitch({ref, ...props});

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Switch.displayName = "NextUI.Switch";
}

export default Switch;
