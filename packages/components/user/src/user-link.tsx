import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {Link, LinkProps} from "@nextui-org/link";

export interface UserLinkProps extends LinkProps {}

export const UserLink = forwardRef<UserLinkProps, "a">((props, ref) => {
  const {
    rel = "noopener",
    color = "primary",
    target = "_blank",
    className,
    children,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  return (
    <Link
      ref={domRef}
      className={clsx("nextui-user-link", className)}
      color={color}
      rel={rel}
      target={target}
      {...otherProps}
    >
      {children}
    </Link>
  );
});

if (__DEV__) {
  UserLink.displayName = "NextUI.UserLink";
}

UserLink.toString = () => ".nextui-user-link";
