import {forwardRef} from "@nextui-org/system";
import {cloneElement} from "react";

import {UseImageProps, useImage} from "./use-image";

export interface ImageProps extends Omit<UseImageProps, "ref" | "isLoading"> {}

const Image = forwardRef<ImageProps, "img">((props, ref) => {
  const {
    Component,
    domRef,
    isBlurred,
    isZoomed,
    showSkeleton,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
  } = useImage({
    ref,
    ...props,
  });

  const img = <Component ref={domRef} {...getImgProps()} />;

  if (isBlurred) {
    // clone element to add isBlurred prop to the cloned image
    return (
      <div {...getWrapperProps()}>
        {img}
        {cloneElement(img, getBlurredImgProps())}
      </div>
    );
  }

  // when zoomed or showSkeleton, we need to wrap the image
  if (isZoomed || showSkeleton) {
    return <div {...getWrapperProps()}>{img}</div>;
  }

  return img;
});

Image.displayName = "NextUI.Image";

export default Image;
