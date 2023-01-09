import {mergeProps} from "@react-aria/utils";
import {forwardRef} from "@nextui-org/system";
import {link, cx} from "@nextui-org/theme";
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
    disableAnimation,
    externalIcon = <LinkIcon />,
    isExternal,
    linkProps,
    className,
    ...otherProps
  } = useLink({...props, ref});

  const Component = as || "a";

  return (
    <Component
      ref={domRef}
      className={cx(
        link({
          color,
          size,
          isUnderline,
          isBlock,
          disableAnimation,
        }),
        className,
      )}
      {...mergeProps(linkProps, otherProps)}
    >
      <>
        {children}
        {isExternal && externalIcon}
      </>
    </Component>
  );
});

if (__DEV__) {
  Link.displayName = "NextUI.Link";
}

Link.toString = () => ".nextui-link";

export default Link;
