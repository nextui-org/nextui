import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledImageSkeleton} from "./image.styles";

export interface ImageSkeletonProps extends HTMLNextUIProps<"div"> {
  /**
   * The skeleton opacity - between 0 and 1.
   * @default 0.5
   */
  opacity?: number;
}

const ImageSkeleton = forwardRef<ImageSkeletonProps, "div">((props, ref) => {
  const {opacity, css, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  return (
    <StyledImageSkeleton
      ref={domRef}
      className={clsx("nextui-image-skeleton", className)}
      css={{
        opacity,
        ...css,
      }}
      {...otherProps}
    />
  );
});

if (__DEV__) {
  ImageSkeleton.displayName = "NextUI.ImageSkeleton";
}

ImageSkeleton.toString = () => ".nextui-image-skeleton";

export default ImageSkeleton;
