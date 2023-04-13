import {forwardRef} from "@nextui-org/system";

import {UseLinkProps, useLink} from "./use-link";
import {LinkIcon} from "./link-icon";

export interface LinkProps extends Omit<UseLinkProps, "ref"> {}

const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const {Component, children, showAnchorIcon, anchorIcon = <LinkIcon />, getLinkProps} = useLink({
    ...props,
    ref,
  });

  return (
    <Component {...getLinkProps()}>
      <>
        {children}
        {showAnchorIcon && anchorIcon}
      </>
    </Component>
  );
});

Link.displayName = "NextUI.Link";

export default Link;
