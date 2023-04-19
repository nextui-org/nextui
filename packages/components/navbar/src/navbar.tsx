import {forwardRef} from "@nextui-org/system";
import {pickChildren} from "@nextui-org/shared-utils";

import {UseNavbarProps, useNavbar} from "./use-navbar";
import {NavbarProvider} from "./navbar-context";
import NavbarMenu from "./navbar-menu";

export interface NavbarProps extends Omit<UseNavbarProps, "ref" | "hideOnScroll"> {
  children?: React.ReactNode | React.ReactNode[];
}

const Navbar = forwardRef<NavbarProps, "div">((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbar({ref, ...otherProps});

  const Component = context.Component;

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu);

  return (
    <NavbarProvider value={context}>
      <Component {...context.getBaseProps()}>
        <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
        {menu}
      </Component>
    </NavbarProvider>
  );
});

Navbar.displayName = "NextUI.Navbar";

export default Navbar;
