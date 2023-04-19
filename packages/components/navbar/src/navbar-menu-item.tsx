import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {motion, HTMLMotionProps} from "framer-motion";
import {mergeProps} from "@react-aria/utils";

import {menuItemVariants} from "./navbar-menu-transitions";
import {useNavbarContext} from "./navbar-context";

export interface NavbarMenuItemProps extends HTMLNextUIProps<"li"> {
  children?: React.ReactNode;
  /**
   * Whether to disable the animation.
   */
  disableAnimation?: boolean;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"li">;
}

const NavbarMenuItem = forwardRef<NavbarMenuItemProps, "li">((props, ref) => {
  const {className, children, disableAnimation, motionProps, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const {slots, isMenuOpen, classNames} = useNavbarContext();

  const styles = clsx(classNames?.menuItem, className);

  if (disableAnimation) {
    return (
      <li
        ref={domRef}
        className={slots.menuItem?.({class: styles})}
        data-open={dataAttr(isMenuOpen)}
        {...otherProps}
      >
        {children}
      </li>
    );
  }

  return (
    <motion.li
      ref={domRef}
      className={slots.menuItem?.({class: styles})}
      data-open={dataAttr(isMenuOpen)}
      variants={menuItemVariants}
      {...mergeProps(motionProps, otherProps)}
    >
      {children}
    </motion.li>
  );
});

NavbarMenuItem.displayName = "NextUI.NavbarMenuItem";

export default NavbarMenuItem;
