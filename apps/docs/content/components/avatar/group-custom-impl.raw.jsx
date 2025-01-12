import {forwardRef} from "react";
import {Avatar, useAvatarGroup, AvatarGroupProvider} from "@heroui/react";

const AvatarGroup = forwardRef((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    renderCount = (count) => <Avatar name={`+${count}`} />,
    getAvatarGroupProps,
  } = useAvatarGroup({
    ref,
    ...props,
  });

  return (
    <Component {...getAvatarGroupProps()}>
      <AvatarGroupProvider value={context}>
        {clones}
        {remainingCount > 0 && renderCount(remainingCount)}
      </AvatarGroupProvider>
    </Component>
  );
});

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
