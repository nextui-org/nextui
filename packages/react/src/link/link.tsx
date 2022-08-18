import type {AriaLinkProps} from "@react-types/link";
import type {FocusRingAria} from "@react-aria/focus";

import React, {useMemo, HTMLAttributes} from "react";
import {useLink} from "@react-aria/link";
import {mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import useTheme from "../use-theme";
import {getTokenValue} from "../theme/utils";
import {__DEV__} from "../utils/assertion";

import LinkIcon from "./icon";
import StyledLink, {LinkVariantsProps} from "./link.styles";

interface Props extends Omit<HTMLNextUIProps<"a">, keyof LinkVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
  isExternal?: boolean;
}

export type LinkProps = Props & LinkVariantsProps & AriaLinkProps;

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof LinkProps>;
}

interface ILinkAria {
  /** Props for the link element. */
  linkProps: Omit<HTMLAttributes<HTMLElement>, keyof LinkProps>;
  /** Whether the link is currently pressed. */
  isPressed: boolean;
}

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<HTMLAttributes<HTMLElement>, keyof LinkProps>;
}

const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const {
    children,
    isExternal = false,
    as,
    css,
    color = "default",
    autoFocus,
    className,
    ...otherProps
  } = props;

  const {isDark} = useTheme();

  const domRef = useDOMRef(ref);

  const {linkProps}: ILinkAria = useLink({...otherProps, elementType: as} as AriaLinkProps, domRef);
  const {isFocusVisible, focusProps}: IFocusRingAria = useFocusRing({autoFocus});

  const linkCss = useMemo(() => {
    let linkBackgroundColor = `$colors$${color}Light`;

    switch (color) {
      case "inherit": {
        linkBackgroundColor = getTokenValue("colors", "text", 0.2);
        break;
      }
      case "default": {
        linkBackgroundColor = getTokenValue("colors", "link", 0.2);
        break;
      }
      case "text": {
        linkBackgroundColor = getTokenValue("colors", "text", 0.2);
        break;
      }
    }

    return {
      ...css,
      $$linkBackgroundColor: linkBackgroundColor,
    };
  }, [css, color, isDark]);

  return (
    <StyledLink
      ref={domRef}
      as={as}
      className={clsx("nextui-link", className)}
      color={color}
      css={linkCss}
      isFocusVisible={isFocusVisible}
      {...mergeProps(linkProps, focusProps, otherProps)}
    >
      <>
        {children}
        {isExternal && <LinkIcon />}
      </>
    </StyledLink>
  );
});

if (__DEV__) {
  Link.displayName = "NextUI.Link";
}

Link.toString = () => ".nextui-link";

export default Link;
