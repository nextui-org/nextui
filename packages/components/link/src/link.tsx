import {HTMLAttributes} from "react";
import {useLink as useAriaLink} from "react-aria";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {mergeProps} from "react-aria";

import {StyledLink} from "./link.styles";
import {UseLinkProps, useLink} from "./use-link";
import {LinkIcon} from "./link-icon";

export interface LinkProps extends UseLinkProps {}

interface ILinkAria {
  /** Props for the link element. */
  linkProps: Omit<HTMLAttributes<HTMLElement>, keyof UseLinkProps>;
  /** Whether the link is currently pressed. */
  isPressed: boolean;
}

const Link = forwardRef<LinkProps, "div">((props, ref) => {
  const {children, as, css, linkCss, isExternal, focusProps, className, ...otherProps} =
    useLink(props);

  const domRef = useDOMRef(ref);

  const {linkProps}: ILinkAria = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  return (
    <StyledLink
      ref={domRef}
      className={clsx("nextui-link", className)}
      css={{
        ...linkCss,
        ...css,
      }}
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
