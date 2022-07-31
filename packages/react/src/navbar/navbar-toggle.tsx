import type {ToggleProps} from "@react-types/checkbox";
import type {AriaToggleButtonProps} from "@react-types/button";

import React, {useMemo} from "react";
import {useToggleButton} from "@react-aria/button";
import {useToggleState} from "@react-stately/toggle";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import useBodyScroll from "../use-body-scroll";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {useNavbarContext} from "./navbar-context";
import {StyledNavbarToggle, NavbarToggleVariantsProps} from "./navbar.styles";
import NavbarToggleIcon from "./navbar-toggle-icon";

interface Props extends HTMLNextUIProps<"button"> {}

export type NavbarToggleProps = Props &
  AriaToggleButtonProps &
  ToggleProps &
  NavbarToggleVariantsProps;

const NavbarToggle = forwardRef<NavbarToggleProps, "button">((props, ref) => {
  const {children, className, autoFocus, onChange, as, css} = props;

  const {parentRef, setIsCollapseOpen} = useNavbarContext();

  const [, setBodyHidden] = useBodyScroll(parentRef, {scrollLayer: true});

  const handleChange = (isOpen: boolean) => {
    setIsCollapseOpen(isOpen);
    onChange?.(isOpen);
    setBodyHidden(isOpen);
  };

  const domRef = useDOMRef(ref);
  const state = useToggleState({...props, onChange: handleChange});
  const {buttonProps, isPressed} = useToggleButton(props, state, domRef);
  const {isFocusVisible, focusProps} = useFocusRing({autoFocus});

  const child = useMemo(() => {
    return children || <NavbarToggleIcon isExpanded={state.isSelected} />;
  }, [children, state.isSelected]);

  return (
    <StyledNavbarToggle
      ref={domRef}
      as={as}
      className={clsx("nextui-navbar-toggle", className)}
      css={css}
      isFocusVisible={isFocusVisible}
      isPressed={isPressed}
      {...mergeProps(buttonProps, focusProps)}
    >
      {child}
    </StyledNavbarToggle>
  );
});

if (__DEV__) {
  NavbarToggle.displayName = "NextUI.NavbarToggle";
}

NavbarToggle.toString = () => ".nextui-navbar-toggle";

export default NavbarToggle;
