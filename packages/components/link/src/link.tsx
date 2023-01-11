import {mergeProps} from "@react-aria/utils";
import {forwardRef} from "@nextui-org/system";
import {link, twMerge} from "@nextui-org/theme";
import {__DEV__} from "@nextui-org/shared-utils";

import {UseLinkProps, useLink} from "./use-link";
import {LinkIcon} from "./link-icon";

export interface LinkProps extends UseLinkProps {}

const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const {
    as,
    color,
    size,
    domRef,
    children,
    isUnderline,
    isBlock,
    isDisabled,
    disableAnimation,
    showAnchorIcon,
    anchorIcon = <LinkIcon />,
    linkProps,
    className,
    ...otherProps
  } = useLink({...props, ref});

  const Component = as || "a";

  const classes = twMerge(
    link({
      color,
      size,
      isUnderline,
      isBlock,
      isDisabled,
      disableAnimation,
      className,
    }),
  );

  return (
    <Component ref={domRef} className={classes} {...mergeProps(linkProps, otherProps)}>
      <>
        {children}
        {showAnchorIcon && anchorIcon}
      </>
    </Component>
  );
});

if (__DEV__) {
  Link.displayName = "NextUI.Link";
}

Link.toString = () => ".nextui-link";

export default Link;
