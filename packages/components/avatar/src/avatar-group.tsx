import {ReactNode} from "react";
import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import StyledAvatarGroup, {
  StyledAvatarGroupCount,
  AvatarGroupVariants,
} from "./avatar-group.styles";

export interface AvatarGroupProps extends HTMLNextUIProps<"div", AvatarGroupVariants> {
  count?: number;
  children?: ReactNode;
}

const AvatarGroup = forwardRef<AvatarGroupProps, "div">((props, ref) => {
  const {count, children, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  return (
    <StyledAvatarGroup
      ref={domRef}
      className={clsx("nextui-avatar-group", className)}
      {...otherProps}
    >
      {children}
      {count && (
        <StyledAvatarGroupCount className="nextui-avatar-group-count">
          +{count}
        </StyledAvatarGroupCount>
      )}
    </StyledAvatarGroup>
  );
});

if (__DEV__) {
  AvatarGroup.displayName = "NextUI.AvatarGroup";
}

AvatarGroup.toString = () => ".nextui-avatar-group";

export default AvatarGroup;
