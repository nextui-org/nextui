import {forwardRef} from "@nextui-org/system";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {Drip} from "@nextui-org/drip";
import {Children, useMemo} from "react";

import ButtonGroup from "./button-group";
import ButtonIcon from "./button-icon";
import {StyledButton} from "./button.styles";
import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends Omit<UseButtonProps, "ref"> {}

type CompoundButton = {
  Group: typeof ButtonGroup;
};

const Button = forwardRef<ButtonProps, "button", CompoundButton>((props, ref) => {
  const {
    buttonRef,
    children,
    state,
    as,
    css,
    hasIcon,
    dripBindings,
    isRightIcon,
    cssColors,
    getIconCss,
    className,
    isGradientButtonBorder,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  const buttonProps = useMemo(() => getButtonProps(), [getButtonProps]);

  return (
    <StyledButton
      ref={buttonRef}
      as={as}
      className={clsx("nextui-button", className)}
      css={{
        ...cssColors,
        ...css,
      }}
      data-state={state}
      {...buttonProps}
    >
      {Children.count(children) === 0 ? (
        <ButtonIcon
          isSingle
          css={getIconCss}
          isAuto={buttonProps.auto}
          isGradientButtonBorder={isGradientButtonBorder}
          isRight={isRightIcon}
        >
          {hasIcon}
        </ButtonIcon>
      ) : hasIcon ? (
        <>
          <ButtonIcon
            css={getIconCss}
            isAuto={buttonProps.auto}
            isGradientButtonBorder={isGradientButtonBorder}
            isRight={isRightIcon}
            isSingle={false}
          >
            {hasIcon}
          </ButtonIcon>
          <div
            className={clsx("nextui-button-text", {
              "nextui-button-text-right": isRightIcon,
              "nextui-button-text-left": !isRightIcon,
            })}
          >
            {children}
          </div>
        </>
      ) : (
        <span className="nextui-button-text">{children}</span>
      )}
      <Drip color="white" {...dripBindings} />
    </StyledButton>
  );
});

Button.Group = ButtonGroup;

if (__DEV__) {
  Button.displayName = "NextUI.Button";
}

Button.toString = () => ".nextui-button";

export default Button;
