import {forwardRef} from "@nextui-org/system";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import ImageSkeleton from "./image-skeleton";
import {StyledImage, StyledImageContainer} from "./image.styles";
import {UseImageProps, useImage} from "./use-image";

export interface ImageProps extends Omit<UseImageProps, "ref"> {}

const Image = forwardRef<ImageProps, "img">((props, ref) => {
  const {
    w,
    css,
    src,
    width,
    height,
    imageRef,
    objectFit,
    isLoading,
    showSkeleton,
    zoomHeight,
    state,
    className,
    containerCss,
    onLoad,
    ...otherProps
  } = useImage({
    ref,
    ...props,
  });

  return (
    <StyledImageContainer
      className={clsx("nextui-image-container", className)}
      css={{
        width: w,
        height: zoomHeight,
        ...containerCss,
      }}
      data-state={state}
      isLoaded={!isLoading || showSkeleton}
    >
      {showSkeleton && <ImageSkeleton opacity={1} />}
      <StyledImage
        ref={imageRef}
        alt={props.alt || ""}
        className="nextui-image"
        css={{
          objectFit,
          ...css,
        }}
        data-state={state}
        height={height}
        src={src}
        width={width}
        onLoad={onLoad}
        {...otherProps}
      />
    </StyledImageContainer>
  );
});

if (__DEV__) {
  Image.displayName = "NextUI.Image";
}

Image.toString = () => ".nextui-image";

export default Image;
