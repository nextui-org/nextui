import {forwardRef} from "@nextui-org/system";
import {cloneElement} from "react";

import {UseImageProps, useImage} from "./use-image";

export interface ImageProps extends Omit<UseImageProps, "ref" | "showSkeleton"> {}

const Image = forwardRef<ImageProps, "img">((props, ref) => {
  const {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    isZoomed,
    fallbackSrc,
    disableSkeleton,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
  } = useImage({
    ref,
    ...props,
  });

  const img = <Component ref={domRef} {...getImgProps()} />;
  const zoomed = (
    <div className={slots.zoomedWrapper({class: classNames?.zoomedWrapper})}>{img}</div>
  );

  if (isBlurred) {
    // clone element to add isBlurred prop to the cloned image
    return (
      <div {...getWrapperProps()}>
        {isZoomed ? zoomed : img}
        {cloneElement(img, getBlurredImgProps())}
      </div>
    );
  }

  // when zoomed or showSkeleton, we need to wrap the image
  if (isZoomed || !disableSkeleton || fallbackSrc) {
    return <div {...getWrapperProps()}> {isZoomed ? zoomed : img}</div>;
  }

  return img;
});

Image.displayName = "NextUI.Image";

export default Image;
