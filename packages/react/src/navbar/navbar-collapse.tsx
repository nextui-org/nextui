import React, {useState, useEffect, useMemo} from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import useIntersectionObserver from "../use-intersection-observer";
import {__DEV__} from "../utils/assertion";

import {useNavbarContext} from "./navbar-context";
import {
  StyledNavbarCollapse,
  StyledNavbarCollapseWrapper,
  StyledNavbarCollapseItem,
  NavbarCollapseItemVariantsProps,
  NavbarCollapseVariantsProps,
} from "./navbar.styles";

interface Props extends HTMLNextUIProps<"ul"> {}

export type NavbarCollapseProps = Props & NavbarCollapseVariantsProps;

const NavbarCollapseItem = forwardRef<
  HTMLNextUIProps<"li"> &
    NavbarCollapseItemVariantsProps & {
      transitionDelay?: number; // in seconds
    },
  "li"
>((props, ref) => {
  const {children, className, transitionDelay, disableAnimation, style, css, ...otherProps} = props;
  const context = useNavbarContext();

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

  const itemStyle = useMemo(() => {
    const timeDelay = isVisible ? transitionDelay : 0;

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
  }, [disableAnimation, isVisible, transitionDelay, context.isCollapseOpen]);

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

const NavbarCollapse = forwardRef<NavbarCollapseProps, "ul">((props, ref) => {
  const {children, className, ...otherProps} = props;

  const [hasScrolled, setHasScrolled] = useState(false);

  const context = useNavbarContext();
  const domRef = useDOMRef(ref);

  useEffect(() => {
    if (!context.isCollapseOpen) {
      // restore scroll to the top of the collapse
      domRef.current?.scrollTo({
        top: 0,
      });
      setHasScrolled(false);
    }

    const handleScroll = () => {
      if (domRef.current?.scrollTop > 0 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    domRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      domRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [context.isCollapseOpen]);

  const items = [
    "Store",
    "Mac",
    "iPad",
    "iPhone",
    "Watch",
    "TV & Home",
    "Music",
    "Support",
    "Store",
    "Mac",
    "iPad",
    "iPhone",
    "Watch",
    "TV & Home",
    "Music",
    "Support",
  ];

  return (
    <StyledNavbarCollapse
      ref={domRef}
      className={clsx("nextui-navbar-collapse", className)}
      isOpen={context.isCollapseOpen}
      {...otherProps}
    >
      <StyledNavbarCollapseWrapper className="nextui-navbar-collapse-wrapper">
        {children}
        {items.map((item, index) => (
          <NavbarCollapseItem
            key={`${item}-${index}`}
            className="nextui-navbar-collapse-item"
            transitionDelay={hasScrolled ? 0 : index / items.length}
          >
            {item}
          </NavbarCollapseItem>
        ))}
      </StyledNavbarCollapseWrapper>
    </StyledNavbarCollapse>
  );
});

if (__DEV__) {
  NavbarCollapse.displayName = "NextUI.NavbarCollapse";
}

NavbarCollapse.toString = () => ".nextui-navbar-collapse";

export default NavbarCollapse;
