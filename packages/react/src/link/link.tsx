import type {AriaLinkProps} from "@react-types/link";

import React from "react";
import {useLink} from "@react-aria/link";
import {mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import LinkIcon from "./icon";
import StyledLink, {LinkVariantsProps} from "./link.styles";

interface Props extends Omit<HTMLNextUIProps<"a">, keyof LinkVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
  icon?: boolean;
}

export type LinkProps = Props & LinkVariantsProps & AriaLinkProps;

const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const {children, icon = false, as, autoFocus, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const {linkProps} = useLink({...otherProps, elementType: as} as AriaLinkProps, domRef);
  const {isFocusVisible, focusProps} = useFocusRing({autoFocus});

  return (
    <StyledLink
      ref={domRef}
      as={as}
      className={clsx("nextui-link", className)}
      isFocusVisible={isFocusVisible}
      {...mergeProps(linkProps, focusProps, otherProps)}
    >
      <>
        {children}
        {icon && <LinkIcon />}
      </>
    </StyledLink>
  );
});

if (__DEV__) {
  Link.displayName = "NextUI.Link";
}

Link.toString = () => ".nextui-link";

export default Link;
