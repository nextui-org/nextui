import React from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";

import {StyledNavbar} from "./navbar.styles";

export interface NavbarProps extends HTMLNextUIProps<"nav"> {}

export const Navbar = forwardRef<NavbarProps, "nav">((props, ref) => {
  const domRef = useDOMRef(ref);

  return <StyledNavbar ref={domRef}>Hello</StyledNavbar>;
});

if (__DEV__) {
  Navbar.displayName = "NextUI.Navbar";
}

Navbar.toString = () => ".nextui-navbar";
