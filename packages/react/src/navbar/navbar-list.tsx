import React, {useEffect} from "react";
import {createPortal} from "react-dom";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import usePortal from "../use-portal";
import useBodyScroll from "../use-body-scroll";
import {__DEV__} from "../utils/assertion";

import {useNavbarContext} from "./navbar-context";
import {
  StyledNavbarList,
  StyledNavbarListWrapper,
  StyledNavbarListItem,
  NavbarListVariantsProps,
} from "./navbar.styles";

interface Props extends HTMLNextUIProps<"ul"> {
  portalName?: string;
  animationDelay?: number;
}

export type NavbarListProps = Props & NavbarListVariantsProps;

const NavbarList = forwardRef<NavbarListProps, "button">((props, ref) => {
  const {
    children,
    className,
    portalName = "nextui-navbar-list",
    animationDelay = 60,
    ...otherProps
  } = props;

  const context = useNavbarContext();
  const portal = usePortal(portalName, () => context.parentRef?.current);
  const domRef = useDOMRef(ref);

  const [, setBodyHidden] = useBodyScroll(context.parentRef, {scrollLayer: true});

  useEffect(() => {
    setBodyHidden(context.isListOpen);
  }, [context.isListOpen]);

  const items = ["Store", "Mac", "iPad", "iPhone", "Watch", "TV & Home", "Music", "Support"];

  const contents = (
    <StyledNavbarList
      ref={domRef}
      className={clsx("nextui-navbar-list", className)}
      isOpen={context.isListOpen}
      {...otherProps}
    >
      <StyledNavbarListWrapper>
        {children}
        {items.map((item, index) => {
          const pos = context.isListOpen ? index + 1 : (index + 1) * -1;
          const time = pos * animationDelay;

          return (
            <StyledNavbarListItem
              key={item}
              css={{
                transform: `translateY(calc((${pos} * 10px) * -1))`,
                transition: `opacity ${time}ms ease ${time}ms, transform ${time}ms ease ${time}ms`,
              }}
            >
              {item}
            </StyledNavbarListItem>
          );
        })}
      </StyledNavbarListWrapper>
    </StyledNavbarList>
  );

  return portal ? createPortal(contents, portal) : null;
});

if (__DEV__) {
  NavbarList.displayName = "NextUI.NavbarList";
}

NavbarList.toString = () => ".nextui-navbar-list";

export default NavbarList;
