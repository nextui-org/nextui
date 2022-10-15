import {forwardRef} from "@nextui-org/system";
import {useFocusableRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import RadioGroup from "./radio-group";
import {
  StyledRadio,
  StyledRadioContainer,
  StyledRadioPoint,
  StyledRadioText,
  StyledRadioDescription,
} from "./radio.styles";
import {UseRadioProps, useRadio} from "./use-radio";

export interface RadioProps extends UseRadioProps {}

type CompoundRadio = {
  Group: typeof RadioGroup;
};

const Radio = forwardRef<RadioProps, "label", CompoundRadio>((props, ref) => {
  const {className, as, css, children, label, description, ...radioProps} = props;

  const {
    size,
    state,
    color,
    inputRef,
    labelColor,
    isHovered,
    isSquared,
    isInvalid,
    isDisabled,
    disableAnimation,
    isFocusVisible,
    focusProps,
    hoverProps,
    inputProps,
    isRequired,
  } = useRadio({...radioProps, children: children ?? label});

  const domRef = useFocusableRef(ref, inputRef);

  return (
    <StyledRadio
      ref={domRef}
      {...hoverProps}
      as={as}
      className={clsx("nextui-radio", className)}
      color={color}
      css={css}
      data-state={state}
      disableAnimation={disableAnimation}
      isChecked={inputProps.checked}
      isDisabled={isDisabled}
      isHovered={isHovered}
      isInvalid={isInvalid}
      isSquared={isSquared}
      size={size}
    >
      <StyledRadioContainer className="nextui-radio-container">
        <StyledRadioPoint
          className="nextui-radio-point"
          isFocusVisible={isFocusVisible}
          {...focusProps}
        >
          <VisuallyHidden>
            <input
              ref={inputRef}
              className="nextui-radio-input"
              required={isRequired}
              {...mergeProps(inputProps, focusProps)}
            />
          </VisuallyHidden>
        </StyledRadioPoint>
        <StyledRadioText
          className="nextui-radio-label"
          color={labelColor}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        >
          {children}
        </StyledRadioText>
      </StyledRadioContainer>
      {description && (
        <StyledRadioDescription
          className="nextui-radio-description"
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        >
          {description}
        </StyledRadioDescription>
      )}
    </StyledRadio>
  );
});

Radio.Group = RadioGroup;

if (__DEV__) {
  Radio.displayName = "NextUI.Radio";
}

Radio.toString = () => ".nextui-radio";

export default Radio;
