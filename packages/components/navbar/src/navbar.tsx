import {forwardRef} from "@nextui-org/system";

import {UseNavbarProps, useNavbar} from "./use-navbar";
import {NavbarProvider} from "./navbar-context";

export interface NavbarProps extends Omit<UseNavbarProps, "ref"> {
  children?: React.ReactNode | React.ReactNode[];
}

const Navbar = forwardRef<NavbarProps, "div">((props, ref) => {
  const {children, ...otherProps} = props;

  const {Component, getBaseProps, getWrapperProps, context} = useNavbar({ref, ...otherProps});

  return (
    <NavbarProvider value={context}>
      <Component {...getBaseProps()}>
        <header {...getWrapperProps()}>{children}</header>
      </Component>
    </NavbarProvider>
  );
});

Navbar.displayName = "NextUI.Navbar";

export default Navbar;
