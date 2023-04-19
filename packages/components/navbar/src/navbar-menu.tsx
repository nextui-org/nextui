import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {HTMLMotionProps, motion} from "framer-motion";
import {usePreventScroll} from "@react-aria/overlays";
import {mergeProps} from "@react-aria/utils";

import {menuVariants} from "./navbar-menu-transitions";
import {useNavbarContext} from "./navbar-context";

export interface NavbarMenuProps extends HTMLNextUIProps<"ul"> {
  children?: React.ReactNode;
  /**
   * Whether to disable the animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"ul">;
}

const NavbarMenu = forwardRef<NavbarMenuProps, "ul">((props, ref) => {
  const {className, children, disableAnimation = false, motionProps, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const {slots, isMenuOpen, classNames} = useNavbarContext();

  const styles = clsx(classNames?.menu, className);

  usePreventScroll({
    isDisabled: !isMenuOpen,
  });

  if (disableAnimation) {
    return (
      <ul
        ref={domRef}
        className={slots.menu?.({class: styles})}
        data-open={dataAttr(isMenuOpen)}
        {...otherProps}
      >
        {children}
      </ul>
    );
  }

  return (
    <motion.ul
      ref={domRef}
      animate={isMenuOpen ? "open" : "closed"}
      className={slots.menu?.({class: styles})}
      data-open={dataAttr(isMenuOpen)}
      initial={false}
      variants={menuVariants}
      {...mergeProps(motionProps, otherProps)}
    >
      {children}
    </motion.ul>
  );
});

NavbarMenu.displayName = "NextUI.NavbarMenu";

export default NavbarMenu;
