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
}

export type NavbarListProps = Props & NavbarListVariantsProps;

const NavbarList = forwardRef<NavbarListProps, "button">((props, ref) => {
  const {children, className, portalName = "nextui-navbar-list", ...otherProps} = props;

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
        {items.map((item, index) => (
          <StyledNavbarListItem
            key={index}
            css={{
              $$navbarListItemPosition: index,
            }}
          >
            {item}
          </StyledNavbarListItem>
        ))}
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
