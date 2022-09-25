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
    transitionDelay?: number; // in milliseconds
    transitionTime?: number; // in milliseconds
    transitionMatrix?: {
      in: string;
      out: string;
    };
  };

const NavbarCollapseItem = forwardRef<NavbarCollapseItemProps, "li">((props, ref) => {
  const {
    children,
    className,
    transitionDelay,
    transitionTime,
    transitionMatrix,
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

  const itemTransitions = useMemo(() => {
    return {
      transitionDelay: transitionDelay ?? collapseContext?.transitionDelay ?? 0,
      transitionTime: transitionTime ?? collapseContext?.transitionTime ?? 0,
      transitionMatrix: transitionMatrix ??
        collapseContext?.transitionMatrix ?? {
          in: "matrix(1, 0, 0, 1, 0, 0)",
          out: "matrix(0.97, 0, 0, 1, 0, 20)",
        },
    };
  }, [
    transitionDelay,
    transitionTime,
    transitionMatrix,
    collapseContext.transitionMatrix,
    collapseContext.transitionDelay,
    collapseContext.transitionTime,
  ]);

  const defaultDelay = useMemo(
    () =>
      collapseContext.items && index > -1
        ? (index / collapseContext.items.length) * 0.5 * 1000 + itemTransitions.transitionDelay
        : 0.1,
    [index, itemTransitions.transitionDelay, collapseContext?.items],
  );

  const itemStyle = useMemo(() => {
    const timeDelay = isVisible && !collapseContext.hasScrolled ? defaultDelay : 0;

    return {
      "--nextui--collapseItemOpacity": isVisible ? 1 : 0,
      "--nextui--collapseItemTransform": isVisible
        ? itemTransitions.transitionMatrix.in
        : itemTransitions.transitionMatrix.out,
      "--netxui--collapseItemTransition":
        !disableAnimation && context.isCollapseOpen
          ? `opacity ${itemTransitions.transitionTime}ms cubic-bezier(0.5, 0, 0, 1) ${timeDelay}ms, transform ${itemTransitions.transitionTime}ms cubic-bezier(0.5, 0, 0, 1) ${timeDelay}ms`
          : "none",
    };
  }, [
    index,
    isVisible,
    disableAnimation,
    defaultDelay,
    itemTransitions.transitionMatrix,
    itemTransitions.transitionTime,
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
