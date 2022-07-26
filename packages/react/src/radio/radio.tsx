import type {FocusRingAria} from "@react-aria/focus";
import type {FocusableRef} from "@react-types/shared";
import type {ReactRef} from "../utils/refs";
import type {CSS} from "../theme/stitches.config";
import type {UseRadioProps} from "./use-radio";

import React, {useMemo, ReactNode} from "react";
import {mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";
import {useFocusableRef} from "../utils/dom";

import RadioGroup from "./radio-group";
import {useRadio} from "./use-radio";
import {
  StyledRadioText,
  StyledRadioPoint,
  StyledRadioLabel,
  StyledRadioDescription,
  StyledRadioContainer,
} from "./radio.styles";

interface Props extends UseRadioProps {
  label?: string;
  children?: ReactNode;
  description?: string | ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export type RadioProps = Props & {css?: CSS};

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof RadioProps>;
}

export const Radio = React.forwardRef((props: RadioProps, ref: ReactRef<HTMLInputElement>) => {
  const {className, as, css, children, label, description, ...otherProps} = props;

  const {
    size,
    color,
    inputRef,
    labelColor,
    isHovered,
    isSquared,
    isInvalid,
    isDisabled,
    autoFocus,
    disableAnimation,
    hoverProps,
    inputProps,
  } = useRadio({...otherProps, children: children ?? label});

  const domRef = useFocusableRef<HTMLLabelElement>(ref as FocusableRef<HTMLLabelElement>, inputRef);

  const {focusProps, isFocusVisible}: IFocusRingAria = useFocusRing({
    autoFocus,
  });

  const radioState = useMemo(() => {
    if (isHovered) return "is-hovered";
    if (isDisabled) return "is-disabled";

    return inputProps.checked ? "checked" : "uncheked";
  }, [isDisabled, inputProps.checked, isHovered]);

  return (
    <StyledRadioLabel
      ref={domRef}
      {...hoverProps}
      as={as}
      className={clsx("nextui-radio-label", `nextui-radio--${radioState}`, className)}
      color={color}
      css={css}
      data-state={radioState}
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
    </StyledRadioLabel>
  );
});

type RadioComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> & {
  Group: typeof RadioGroup;
};

if (__DEV__) {
  Radio.displayName = "NextUI.Radio";
}

Radio.toString = () => ".nextui-radio";

export default Radio as RadioComponent<HTMLLabelElement, RadioProps>;
