import {forwardRef} from "@nextui-org/system";
import {useFocusableRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {
  StyledCheckbox,
  StyledCheckboxContainer,
  StyledCheckboxMask,
  StyledCheckboxText,
  StyledIconCheck,
  StyledIconCheckFirstLine,
  StyledIconCheckSecondLine,
} from "./checkbox.styles";
import {UseCheckboxProps, useCheckbox} from "./use-checkbox";
import CheckboxGroup from "./checkbox-group";

export interface CheckboxProps extends UseCheckboxProps {}

type CompoundCheckbox = {
  Group: typeof CheckboxGroup;
};

const Checkbox = forwardRef<CheckboxProps, "label", CompoundCheckbox>((props, ref) => {
  const {className, as, css, children, label, ...checkboxProps} = props;

  const {
    size,
    color,
    state,
    labelColor,
    isRounded,
    isHovered,
    isFocusVisible,
    lineThrough,
    disableAnimation,
    isIndeterminate,
    inputRef,
    inputProps,
    pressProps,
    hoverProps,
    focusProps,
    containerCss,
    ...otherProps
  } = useCheckbox({...checkboxProps, children: children ?? label});

  const domRef = useFocusableRef(ref, inputRef);

  return (
    <StyledCheckbox
      ref={domRef}
      as={as}
      className={clsx("nextui-checkbox", className)}
      data-state={state}
      {...mergeProps(hoverProps, pressProps, otherProps)}
      css={css}
      disableAnimation={disableAnimation}
      isDisabled={inputProps.disabled}
      size={size}
    >
      <VisuallyHidden>
        <input
          ref={inputRef}
          className="nextui-checkbox-input"
          {...mergeProps(inputProps, focusProps)}
        />
      </VisuallyHidden>
      <StyledCheckboxContainer
        className="nextui-checkbox-container"
        color={color}
        css={containerCss}
        disableAnimation={disableAnimation}
        isDisabled={inputProps.disabled}
        isFocusVisible={isFocusVisible}
        isHovered={isHovered}
        isRounded={isRounded}
        {...focusProps}
      >
        <StyledCheckboxMask
          className="nextui-checkbox-mask"
          disableAnimation={disableAnimation}
          isChecked={inputProps.checked}
          isIndeterminate={isIndeterminate}
        >
          <StyledIconCheck
            className="nextui-icon-check"
            disableAnimation={disableAnimation}
            isChecked={inputProps.checked}
            isIndeterminate={isIndeterminate}
            size={size}
          >
            <StyledIconCheckFirstLine
              className="nextui-icon-check-line1"
              disableAnimation={disableAnimation}
              isChecked={inputProps.checked}
              isIndeterminate={isIndeterminate}
            />
            <StyledIconCheckSecondLine
              className="nextui-icon-check-line2"
              disableAnimation={disableAnimation}
              isChecked={inputProps.checked}
              isIndeterminate={isIndeterminate}
            />
          </StyledIconCheck>
        </StyledCheckboxMask>
      </StyledCheckboxContainer>
      {(children || label) && (
        <StyledCheckboxText
          className="nextui-checkbox-text"
          color={labelColor}
          disableAnimation={disableAnimation}
          isChecked={inputProps.checked}
          isDisabled={inputProps.disabled}
          lineThrough={lineThrough}
        >
          {children || label}
        </StyledCheckboxText>
      )}
    </StyledCheckbox>
  );
});

Checkbox.Group = CheckboxGroup;

if (__DEV__) {
  Checkbox.displayName = "NextUI.Checkbox";
}

Checkbox.toString = () => ".nextui-checkbox";

export default Checkbox;
