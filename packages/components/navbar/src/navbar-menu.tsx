import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {AnimatePresence, domAnimation, HTMLMotionProps, LazyMotion, m} from "framer-motion";
import {mergeProps} from "@react-aria/utils";
import {ReactElement, useCallback} from "react";
import {RemoveScroll} from "react-remove-scroll";
import {Overlay} from "@react-aria/overlays";

import {menuVariants} from "./navbar-menu-transitions";
import {useNavbarContext} from "./navbar-context";

export interface NavbarMenuProps extends HTMLNextUIProps<"ul"> {
  children?: React.ReactNode;
  /**
   * The container element in which the navbar menu overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"ul">;
  /**
   * The prop to control the open state of the menu.
   */
  isOpen?: boolean;
}

const NavbarMenu = forwardRef<"ul", NavbarMenuProps>((props, ref) => {
  const {
    className,
    children,
    portalContainer,
    motionProps,
    style,
    isOpen,
    ...otherProps
  } = props;
  const domRef = useDOMRef(ref);

  const navBarContext = useNavbarContext();
  const { slots, height, disableAnimation, classNames } = navBarContext;
  let isMenuOpen: boolean | undefined;
  if (isOpen == undefined) {
    isMenuOpen = navBarContext.isMenuOpen;
  } else {
    isMenuOpen = isOpen;
  }

  const styles = clsx(classNames?.menu, className);

  const MenuWrapper = useCallback(
    ({ children }: { children: ReactElement }) => {
      return (
        <RemoveScroll forwardProps enabled={isMenuOpen} removeScrollBar={false}>
          {children}
        </RemoveScroll>
      );
    },
    [isMenuOpen]
  );

  const contents = disableAnimation ? (
    <MenuWrapper>
      <ul
        ref={domRef}
        className={slots.menu?.({ class: styles })}
        data-open={dataAttr(isMenuOpen)}
        style={{
          // @ts-expect-error
          "--navbar-height": height,
        }}
        {...otherProps}
      >
        {children}
      </ul>
    </MenuWrapper>
  ) : (
    <AnimatePresence mode="wait">
      {isMenuOpen ? (
        <LazyMotion features={domAnimation}>
          <MenuWrapper>
            <m.ul
              ref={domRef}
              layoutScroll
              animate="enter"
              className={slots.menu?.({ class: styles })}
              data-open={dataAttr(isMenuOpen)}
              exit="exit"
              initial="exit"
              style={{
                // @ts-expect-error
                "--navbar-height": height,
                ...style,
              }}
              variants={menuVariants}
              {...mergeProps(motionProps, otherProps)}
            >
              {children}
            </m.ul>
          </MenuWrapper>
        </LazyMotion>
      ) : null}
    </AnimatePresence>
  );

  return <Overlay portalContainer={portalContainer}>{contents}</Overlay>;
});

NavbarMenu.displayName = "NextUI.NavbarMenu";

export default NavbarMenu;
