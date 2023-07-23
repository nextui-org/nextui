import {forwardRef} from "react";

import {ButtonGroupProvider} from "./button-group-context";
import {UseButtonGroupProps, useButtonGroup} from "./use-button-group";

export interface ButtonGroupProps extends Omit<UseButtonGroupProps, "ref"> {}

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const {Component, domRef, context, children, classNames, getButtonGroupProps} = useButtonGroup({
    ref,
    ...props,
  });

  return (
    <ButtonGroupProvider value={context}>
      <Component ref={domRef} className={classNames} {...getButtonGroupProps()}>
        {children}
      </Component>
    </ButtonGroupProvider>
  );
});

ButtonGroup.displayName = "NextUI.ButtonGroup";

export default ButtonGroup;
