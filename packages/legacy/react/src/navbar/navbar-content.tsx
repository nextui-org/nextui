import React from "react";

import {forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";
import {mergeRefs} from "../utils/refs";

import {NavbarContentProvider} from "./navbar-content-context";
import {StyledNavbarContent, StyledCursorHighlight} from "./navbar.styles";
import {useNavbarContent, UseNavbarContentProps} from "./use-navbar-content";

interface Props {
  /**
   * The content of the Navbar.Content. It is usually the `Navbar.Link` and `Navbar.Item`,
   */
  children?: React.ReactNode | React.ReactNode[];
}

export type NavbarContentProps = Props & UseNavbarContentProps;

const NavbarContent = forwardRef<NavbarContentProps, "ul">((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbarContent(otherProps);

  const domRef = useDOMRef(ref);

  return (
    <NavbarContentProvider value={context}>
      <StyledNavbarContent
        ref={mergeRefs(context.wrapperRef, domRef)}
        className={clsx("nextui-navbar-content", context.className)}
        css={{
          gap: context.gap,
          ...context.css,
        }}
        enableCursorHighlight={context.enableCursorHighlight}
        style={context.style}
        onMouseLeave={context.resetHighlight}
        {...context.otherProps}
      >
        {context.enableCursorHighlight && (
          <StyledCursorHighlight
            ref={context.cursorHighlightRef}
            className="nextui-navbar-cursor-highlight"
            color={context.activeColor}
            css={context.cursorHighlightCss}
            isHighlightSolidVariant={context.isHighlightSolidVariant}
            isHighlightVariant={context.isHighlightVariant}
            isRounded={context.isRounded}
          />
        )}
        {children}
      </StyledNavbarContent>
    </NavbarContentProvider>
  );
});

if (__DEV__) {
  NavbarContent.displayName = "NextUI.NavbarContent";
}

NavbarContent.toString = () => ".nextui-navbar-content";

export default NavbarContent;
