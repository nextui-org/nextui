import React, {forwardRef} from "react";
import {LinkIcon} from "@nextui-org/shared-icons";
import {linkAnchorClasses} from "@nextui-org/theme";
import {LinkProps, useLink} from "@nextui-org/react";

export interface MyLinkProps extends LinkProps {}

const MyLink = forwardRef<HTMLAnchorElement, MyLinkProps>((props, ref) => {
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

MyLink.displayName = "MyLink";

export default MyLink;
