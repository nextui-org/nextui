import {forwardRef} from "@nextui-org/system";
import {LinkIcon} from "@nextui-org/shared-icons";
import {linkAnchorClasses} from "@nextui-org/theme";

import {UseLinkProps, useLink} from "./use-link";

export interface LinkProps extends Omit<UseLinkProps, "ref"> {}

const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps,
  } = useLink({
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
