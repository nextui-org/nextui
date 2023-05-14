const App = `import {forwardRef} from "react";

import {useAvatarGroup, AvatarGroupProvider} from "@nextui-org/react";
import Avatar from "./avatar"; // your custom avatar or nextui avatar

const AvatarGroup = forwardRef((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    renderCount = (count) => <Avatar name={\`+\${count}\`} />,
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

export default AvatarGroup;`;

const AppTs = `import {forwardRef} from "react";

import {useAvatarGroup, AvatarGroupProvider, UseAvatarGroupProps} from "@nextui-org/react";
import Avatar from "./avatar"; // your custom avatar or nextui avatar

export interface AvatarGroupProps extends Omit<UseAvatarGroupProps, "ref"> {}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    renderCount = (count) => <Avatar name={\`+\${count}\`} />,
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

export default AvatarGroup;`;

const react = {
  "/App.jsx": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
