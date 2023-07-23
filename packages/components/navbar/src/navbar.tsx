import {forwardRef} from "react";
import {pickChildren} from "@nextui-org/react-utils";
import {motion} from "framer-motion";
import {mergeProps} from "@react-aria/utils";

import {hideOnScrollVariants} from "./navbar-transitions";
import {UseNavbarProps, useNavbar} from "./use-navbar";
import {NavbarProvider} from "./navbar-context";
import NavbarMenu from "./navbar-menu";

export interface NavbarProps extends Omit<UseNavbarProps, "ref" | "hideOnScroll"> {
  children?: React.ReactNode | React.ReactNode[];
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbar({ref, ...otherProps});

  const Component = context.Component;

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu);

  const content = (
    <>
      <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
      {menu}
    </>
  );

  return (
    <NavbarProvider value={context}>
      {context.shouldHideOnScroll ? (
        <motion.nav
          animate={context.isHidden ? "hidden" : "visible"}
          initial={false}
          variants={hideOnScrollVariants}
          {...mergeProps(context.getBaseProps(), context.motionProps)}
        >
          {content}
        </motion.nav>
      ) : (
        <Component {...context.getBaseProps()}>{content}</Component>
      )}
    </NavbarProvider>
  );
});

Navbar.displayName = "NextUI.Navbar";

export default Navbar;
