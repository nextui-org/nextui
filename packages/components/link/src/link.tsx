import {forwardRef} from "@heroui/system";
import {LinkIcon} from "@heroui/shared-icons";
import {linkAnchorClasses} from "@heroui/theme";

import {UseLinkProps, useLink} from "./use-link";

export interface LinkProps extends UseLinkProps {}

const Link = forwardRef<"a", LinkProps>((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps,
  } = useLink({
    ref,
    ...props,
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

Link.displayName = "HeroUI.Link";

export default Link;
