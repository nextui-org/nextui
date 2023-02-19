import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
// import {Drip} from "@nextui-org/drip";
// import {Children, useMemo} from "react";

// import ButtonIcon from "./button-icon";
import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends Omit<UseButtonProps, "ref"> {}

const Button = forwardRef<ButtonProps, "button">((props, ref) => {
  const {
    Component,
    domRef,
    children,
    slots,
    // styles,
    baseStyles,
    // hasIcon,
    // dripBindings,
    // isRightIcon,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  return (
    <Component ref={domRef} className={slots.base({class: baseStyles})} {...getButtonProps()}>
      {/* {Children.count(children) === 0 ? (
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
      )} */}
      {children}
      {/* <Drip color="white" {...dripBindings} /> */}
    </Component>
  );
});

if (__DEV__) {
  Button.displayName = "NextUI.Button";
}

export default Button;
