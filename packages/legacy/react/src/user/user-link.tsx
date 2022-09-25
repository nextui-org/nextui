import type {LinkProps} from "../link";

import React from "react";

import Link from "../link";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

interface Props {
  children?: React.ReactNode;
}

export type UserLinkProps = Props & Omit<LinkProps, "icon">;

const UserLink = React.forwardRef<HTMLAnchorElement, UserLinkProps>(
  (props: UserLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const {
      rel = "noopener",
      color = "primary",
      target = "_blank",
      className,
      children,
      ...otherProps
    } = props;

    return (
      <Link
        ref={ref}
        className={clsx("nextui-user-link", className)}
        color={color}
        rel={rel}
        target={target}
        {...otherProps}
      >
        {children}
      </Link>
    );
  },
);

if (__DEV__) {
  UserLink.displayName = "NextUI.UserLink";
}

UserLink.toString = () => ".nextui-user-link";

const MemoUserLink = React.memo(UserLink);

export default MemoUserLink;
