import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";

import {AvatarGroupProvider} from "./avatar-group-context";
import {useAvatarGroup, UseAvatarGroupProps} from "./use-avatar-group";
import Avatar from "./avatar";

export interface AvatarGroupProps extends Omit<UseAvatarGroupProps, "ref"> {}

const AvatarGroup = forwardRef<AvatarGroupProps, "div">((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    renderCount = (count) => <Avatar className="hover:-translate-x-0" name={`+${count}`} />,
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

if (__DEV__) {
  AvatarGroup.displayName = "NextUI.AvatarGroup";
}

export default AvatarGroup;
