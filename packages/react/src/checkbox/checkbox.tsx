import type {FocusRingAria} from "@react-aria/focus";
import type {FocusableRef} from "@react-types/shared";
import type {PressResult} from "@react-aria/interactions";
import type {CSS} from "../theme/stitches.config";

import React, {useMemo} from "react";
import {mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {usePress} from "@react-aria/interactions";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";
import {useFocusableRef} from "../utils/dom";

import {useCheckbox, UseCheckboxProps} from "./use-checkbox";
import CheckboxGroup from "./checkbox-group";
import {
  StyledCheckboxLabel,
  StyledCheckboxContainer,
  StyledCheckboxMask,
  StyledIconCheck,
  StyledIconCheckFirstLine,
  StyledIconCheckSecondLine,
  StyledCheckboxText,
} from "./checkbox.styles";

interface Props extends UseCheckboxProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;

export type CheckboxProps = NativeAttrs & Props & {css?: CSS};

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof CheckboxProps>;
}

interface IPressResult extends PressResult {
  pressProps: Omit<React.HTMLAttributes<HTMLElement>, keyof CheckboxProps>;
}

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (props: CheckboxProps, ref: React.Ref<HTMLLabelElement | null>) => {
    const {className, as, css, children, label, ...otherProps} = props;

    const {
      size,
      color,
      labelColor,
      isRounded,
      lineThrough,
      disableAnimation,
      isIndeterminate,
      inputRef,
      inputProps,
      containerCss,
    } = useCheckbox({...otherProps, children: children ?? label});

    const domRef = useFocusableRef<HTMLLabelElement>(
      ref as FocusableRef<HTMLLabelElement>,
      inputRef,
    );

    const {hoverProps, isHovered} = useHover({
      isDisabled: inputProps.disabled,
    });

    // TODO: Event's propagation wasn't stopped https://github.com/adobe/react-spectrum/issues/2383
    const {pressProps}: IPressResult = usePress({
      isDisabled: inputProps.disabled,
    });

    const {focusProps, isFocusVisible}: IFocusRingAria = useFocusRing({
      autoFocus: inputProps.autoFocus,
    });

    const checkboxState = useMemo(() => {
      if (isHovered) return "hovered";

      return isIndeterminate && inputProps.checked
        ? "mixed"
        : inputProps.checked
        ? "checked"
        : "uncheked";
    }, [isHovered, isIndeterminate, inputProps.checked]);

    return (
      <StyledCheckboxLabel
        ref={domRef}
        {...mergeProps(hoverProps, pressProps, otherProps)}
        as={as}
        className={clsx("nextui-checkbox-label", `nextui-checkbox--${checkboxState}`, className)}
        css={css}
        disableAnimation={disableAnimation}
        isDisabled={inputProps.disabled}
        size={size}
      >
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
          <VisuallyHidden>
            <input
              ref={inputRef}
              className="nextui-checkbox-input"
              {...mergeProps(inputProps, focusProps)}
            />
          </VisuallyHidden>
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
      </StyledCheckboxLabel>
    );
  },
);

type CheckboxComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> & {
  Group: typeof CheckboxGroup;
};

if (__DEV__) {
  Checkbox.displayName = "NextUI.Checkbox";
}

Checkbox.toString = () => ".nextui-checkbox";

export default Checkbox as CheckboxComponent<HTMLLabelElement, CheckboxProps>;
