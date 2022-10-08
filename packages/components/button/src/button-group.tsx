import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {ButtonGroupProvider} from "./button-group-context";
import {UseButtonGroupProps, useButtonGroup} from "./use-button-group";
import {StyledButtonGroup} from "./button-group.styles";

export interface ButtonGroupProps extends UseButtonGroupProps {}

const ButtonGroup = forwardRef<ButtonGroupProps, "div">((props, ref) => {
  const {context, children, className, ...otherProps} = useButtonGroup(props);

  const domRef = useDOMRef(ref);

  return (
    <ButtonGroupProvider value={context}>
      <StyledButtonGroup
        ref={domRef}
        className={clsx("nextui-button-group", className)}
        {...otherProps}
      >
        {children}
      </StyledButtonGroup>
    </ButtonGroupProvider>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = "NextUI.ButtonGroup";
}

ButtonGroup.toString = () => ".nextui-button-group";

export default ButtonGroup;
