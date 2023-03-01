import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";

import {UseBadgeProps, useBadge} from "./use-badge";

export interface BadgeProps extends Omit<UseBadgeProps, "ref"> {}

const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
  const {Component, children, content, slots, styles, getBadgeProps} = useBadge({ref, ...props});

  return (
    <div className={slots.base({class: styles?.base})}>
      {children}
      <Component {...getBadgeProps()}>{content}</Component>
    </div>
  );
});

if (__DEV__) {
  Badge.displayName = "NextUI.Badge";
}

Badge.toString = () => ".nextui-badge";

export default Badge;
