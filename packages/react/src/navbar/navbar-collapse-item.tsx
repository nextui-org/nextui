import React, {useEffect, useMemo} from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import useIntersectionObserver from "../use-intersection-observer";
import {__DEV__} from "../utils/assertion";

import {useNavbarContext} from "./navbar-context";
import {useNavbarCollapseContext} from "./navbar-collapse-context";
import {StyledNavbarCollapseItem, NavbarCollapseItemVariantsProps} from "./navbar.styles";

export type NavbarCollapseItemProps = HTMLNextUIProps<"li"> &
  NavbarCollapseItemVariantsProps & {
    transitionDelay?: number; // in seconds
  };

const NavbarCollapseItem = forwardRef<NavbarCollapseItemProps, "li">((props, ref) => {
  const {
    children,
    className,
    transitionDelay = 0,
    disableAnimation,
    style,
    css,
    ...otherProps
  } = props;

  const context = useNavbarContext();
  const collapseContext = useNavbarCollapseContext();

  const domRef = useDOMRef(ref);

  const {isVisible, setEntry} = useIntersectionObserver(domRef, {
    root: context?.parentRef?.current,
    freezeOnceVisible: context.isCollapseOpen,
  });

  useEffect(() => {
    if (!context.isCollapseOpen && isVisible) {
      setEntry(null);
    }
  }, [isVisible, context.isCollapseOpen]);

  const index = useMemo(() => {
    if (collapseContext?.items) {
      return collapseContext.items?.findIndex((item: any) => item?.props?.children === children);
    }

    return -1;
  }, [collapseContext?.items]);

  const defaultDelay = useMemo(
    () =>
      collapseContext.items && index > -1
        ? index / collapseContext.items.length + transitionDelay
        : 0.1,
    [index, transitionDelay, collapseContext?.items],
  );

  const itemStyle = useMemo(() => {
    const timeDelay = isVisible && !collapseContext.hasScrolled ? defaultDelay : 0;

    return {
      "--nextui--collapseItemOpacity": isVisible ? 1 : 0,
      "--nextui--collapseItemTransform": isVisible
        ? "matrix(1, 0, 0, 1, 0, 0)"
        : "matrix(0.85, 0, 0, 0.85, 5, 20)",
      "--netxui--collapseItemTransition":
        !disableAnimation && context.isCollapseOpen
          ? `opacity 1s cubic-bezier(0.5, 0, 0, 1) ${timeDelay}s, transform 1s cubic-bezier(0.5, 0, 0, 1) ${timeDelay}s`
          : "none",
    };
  }, [
    index,
    isVisible,
    disableAnimation,
    defaultDelay,
    context.isCollapseOpen,
    collapseContext.hasScrolled,
  ]);

  return (
    <StyledNavbarCollapseItem
      ref={domRef}
      className={clsx("nextui-navbar-collapse-item", className)}
      css={{
        opacity: "var(--nextui--collapseItemOpacity)",
        transition: "var(--netxui--collapseItemTransition)",
        transform: "var(--nextui--collapseItemTransform)",
        ...css,
      }}
      disableAnimation={disableAnimation}
      style={{...style, ...itemStyle}}
      {...otherProps}
    >
      {children}
    </StyledNavbarCollapseItem>
  );
});

if (__DEV__) {
  NavbarCollapseItem.displayName = "NextUI.NavbarCollapseItem";
}

NavbarCollapseItem.toString = () => ".nextui-navbar-collapse-item";

export default NavbarCollapseItem;
