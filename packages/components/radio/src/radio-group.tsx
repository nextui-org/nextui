import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {RadioGroupProvider} from "./radio-group-context";
import {
  StyledRadioGroup,
  StyledRadioGroupLabel,
  StyledRadioGroupContainer,
} from "./radio-group.styles";
import {UseRadioGroupProps, useRadioGroup} from "./use-radio-group";

export interface RadioGroupProps extends UseRadioGroupProps {}

const RadioGroup = forwardRef<RadioGroupProps, "div">((props, ref) => {
  const {className, children, orientation, label, context, groupProps, labelProps, ...otherProps} =
    useRadioGroup(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledRadioGroup
      ref={domRef}
      className={clsx("nextui-radio-group", className)}
      {...mergeProps(groupProps, otherProps)}
    >
      {label && (
        <StyledRadioGroupLabel className="nextui-radio-group-label" {...labelProps}>
          {label}
        </StyledRadioGroupLabel>
      )}
      <StyledRadioGroupContainer
        className="nextui-radio-group-items"
        isRow={orientation === "horizontal"}
        role="presentation"
      >
        <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
      </StyledRadioGroupContainer>
    </StyledRadioGroup>
  );
});

if (__DEV__) {
  RadioGroup.displayName = "NextUI.RadioGroup";
}

RadioGroup.toString = () => ".nextui-radio-group";

export default RadioGroup;
