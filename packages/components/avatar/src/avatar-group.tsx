import {forwardRef} from "@nextui-org/system";

import {AvatarGroupProvider} from "./avatar-group-context";
import {useAvatarGroup, UseAvatarGroupProps} from "./use-avatar-group";
import Avatar from "./avatar";

export interface AvatarGroupProps extends UseAvatarGroupProps {}

const AvatarGroup = forwardRef<"div", AvatarGroupProps>((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    renderCount = (count) => <Avatar className="hover:-translate-x-0" name={`+${count}`} />,
    getAvatarGroupProps,
  } = useAvatarGroup({
    ...props,
    ref,
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

AvatarGroup.displayName = "NextUI.AvatarGroup";

export default AvatarGroup;
