import type {ReactNode} from "react";

import {forwardRef} from "@nextui-org/system";

import {UseBadgeProps, useBadge} from "./use-badge";

export interface BadgeProps extends Omit<UseBadgeProps, "ref"> {
  children: ReactNode;
}

const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
  const {Component, children, content, slots, classNames, getBadgeProps} = useBadge({
    ref,
    ...props,
  });

  return (
    <div className={slots.base({class: classNames?.base})}>
      {children}
      <Component {...getBadgeProps()}>{content}</Component>
    </div>
  );
});

Badge.displayName = "NextUI.Badge";

export default Badge;
