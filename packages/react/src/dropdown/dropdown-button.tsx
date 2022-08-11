import React, {useMemo, RefAttributes, PropsWithoutRef} from "react";

import {Button, ButtonProps} from "../index";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";
import clsx from "../utils/clsx";

import DropdownTrigger from "./dropdown-trigger";
import {useDropdownContext} from "./dropdown-context";
import DropdownIcon from "./dropdown-icon";

export type DropdownButtonProps = ButtonProps;

const DropdownButton = React.forwardRef(
  (props: DropdownButtonProps, ref: React.Ref<HTMLButtonElement | null>) => {
    const {
      css,
      children,
      className,
      iconRight,
      iconRightCss,
      auto = true,
      animated,
      ...otherProps
    } = props;

    const {disableAnimation} = useDropdownContext();

    const buttonRef = useDOMRef(ref);

    const getIconRight = useMemo(() => {
      return iconRight || <DropdownIcon fill="currentColor" size={14} />;
    }, [iconRight]);

    const isAnimated = useMemo(() => animated || !disableAnimation, [animated, disableAnimation]);

    return (
      <DropdownTrigger>
        <Button
          ref={buttonRef}
          animated={isAnimated}
          auto={auto}
          className={clsx("nextui-dropdown-button", className)}
          css={{
            "& .nextui-button-icon-right, & .nextui-button-text-right": {
              pointerEvents: "none",
            },
            ...css,
          }}
          iconRight={getIconRight}
          iconRightCss={{
            mt: "$1",
            ...iconRightCss,
          }}
          {...otherProps}
        >
          {children}
        </Button>
      </DropdownTrigger>
    );
  },
);

if (__DEV__) {
  DropdownButton.displayName = "NextUI.DropdownButton";
}

type DropdownButtonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {};

DropdownButton.toString = () => ".nextui-dropdown-button";

export default DropdownButton as DropdownButtonComponent<HTMLButtonElement, DropdownButtonProps>;
