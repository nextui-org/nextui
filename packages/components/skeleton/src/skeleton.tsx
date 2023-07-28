import {forwardRef} from "@nextui-org/system";

import {UseSkeletonProps, useSkeleton} from "./use-skeleton";

export interface SkeletonProps extends Omit<UseSkeletonProps, "ref"> {}

const Skeleton = forwardRef<"div", SkeletonProps>((props, ref) => {
  const {Component, children, getSkeletonProps, getContentProps} = useSkeleton({ref, ...props});

  return (
    <Component {...getSkeletonProps()}>
      <div {...getContentProps()}>{children}</div>
    </Component>
  );
});

Skeleton.displayName = "NextUI.Skeleton";

export default Skeleton;
