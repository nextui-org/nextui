import React from "react";

import {HTMLNextUIProps} from "../utils/system";
import {__DEV__} from "../utils/assertion";
import clsx from "../utils/clsx";

import {
  StyledNavbarToggleIconContainer,
  NavbarToggleIconContainerVariantsProps,
} from "./navbar.styles";

interface Props
  extends Omit<HTMLNextUIProps<"span">, keyof NavbarToggleIconContainerVariantsProps> {
  isExpanded?: boolean;
}

export type NavbarToggleIconProps = Props & NavbarToggleIconContainerVariantsProps;

const NavbarToggleIcon: React.FC<NavbarToggleIconProps> = (props) => {
  const {isExpanded = false, className, ...otherProps} = props;

  return (
    <StyledNavbarToggleIconContainer
      aria-hidden={true}
      className={clsx("nextui-navbar-toggle-icon", className)}
      isExpanded={isExpanded}
      tabIndex={-1}
      {...otherProps}
    >
      <span className="line top" />
      <span className="line bottom" />
    </StyledNavbarToggleIconContainer>
  );
};

if (__DEV__) {
  NavbarToggleIcon.displayName = "NextUI.NavbarToggleIcon";
}

NavbarToggleIcon.toString = () => ".nextui-navbar-toggle-icon";

export default NavbarToggleIcon;
