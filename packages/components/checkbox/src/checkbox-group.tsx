import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {CheckboxGroupProvider} from "./checkbox-context";
import {StyledCheckboxGroup, StyledCheckboxGroupContainer} from "./checkbox-group.styles";
import {UseCheckboxGroupProps, useCheckboxGroup} from "./use-checkbox-group";

export interface CheckboxGroupProps extends UseCheckboxGroupProps {}

const CheckboxGroup = forwardRef<CheckboxGroupProps, "div">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {children, orientation, groupProps, labelProps, label, context, className, ...otherProps} =
    useCheckboxGroup(props);

  return (
    <StyledCheckboxGroup
      ref={domRef}
      className={clsx("nextui-checkbox-group", className)}
      {...mergeProps(groupProps, otherProps)}
    >
      {label && (
        <label className="nextui-checkbox-group-label" {...labelProps}>
          {label}
        </label>
      )}
      <StyledCheckboxGroupContainer
        className="nextui-checkbox-group-items"
        isRow={orientation === "horizontal"}
        role="presentation"
      >
        <CheckboxGroupProvider value={context}>{children}</CheckboxGroupProvider>
      </StyledCheckboxGroupContainer>
    </StyledCheckboxGroup>
  );
});

if (__DEV__) {
  CheckboxGroup.displayName = "NextUI.CheckboxGroup";
}

CheckboxGroup.toString = () => ".nextui-checkbox-group";

export default CheckboxGroup;
