import {useLink as useAriaLink} from "@react-aria/link";
import {mergeProps} from "@react-aria/utils";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {__DEV__} from "@nextui-org/shared-utils";
import {link, cx} from "@nextui-org/theme";

import {UseLinkProps, useLink} from "./use-link";
import {LinkIcon} from "./link-icon";

export interface LinkProps extends UseLinkProps {}

const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const {
    children,
    as,
    isUnderline,
    isBlock,
    color,
    disableAnimation,
    isExternal,
    focusProps,
    className,
    ...otherProps
  } = useLink(props);

  const domRef = useDOMRef(ref);

  const {linkProps} = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  return (
    <a
      ref={domRef}
      className={cx(
        link({
          color,
          isUnderline,
          isBlock,
          disableAnimation,
        }),
        className,
      )}
      {...mergeProps(linkProps, focusProps, otherProps)}
    >
      <>
        {children}
        {isExternal && <LinkIcon />}
      </>
    </a>
  );
});

if (__DEV__) {
  Link.displayName = "NextUI.Link";
}

Link.toString = () => ".nextui-link";

export default Link;
