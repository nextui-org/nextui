import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {pickChildren} from "@nextui-org/react-utils";
import {LazyMotion, m} from "framer-motion";
import {mergeProps} from "@react-aria/utils";

import {hideOnScrollVariants} from "./navbar-transitions";
import {UseNavbarProps, useNavbar} from "./use-navbar";
import {NavbarProvider} from "./navbar-context";
import NavbarMenu from "./navbar-menu";

export interface NavbarProps extends Omit<UseNavbarProps, "hideOnScroll"> {
  children?: React.ReactNode | React.ReactNode[];
}

const Navbar = forwardRef<"div", NavbarProps>((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbar({...otherProps, ref});

  const Component = context.Component;

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu);

  const content = (
    <>
      <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
      {menu}
    </>
  );

  const contents = useMemo(() => {
    if (context.shouldHideOnScroll) {
      const domAnimation = () => import("./dom-animation").then((res) => res.default);

      return (
        <LazyMotion features={domAnimation}>
          <m.nav
            animate={context.isHidden ? "hidden" : "visible"}
            initial={false}
            variants={hideOnScrollVariants}
            {...mergeProps(context.getBaseProps(), context.motionProps)}
          >
            {content}
          </m.nav>
        </LazyMotion>
      );
    }

    return <Component {...context.getBaseProps()}>{content}</Component>;
  }, [
    context.shouldHideOnScroll,
    context.motionProps,
    context.isHidden,
    context.getBaseProps,
    content,
  ]);

  return <NavbarProvider value={context}>{contents}</NavbarProvider>;
});

Navbar.displayName = "NextUI.Navbar";

export default Navbar;
