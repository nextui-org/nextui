import React, { useEffect, useRef, useMemo, useState } from 'react';
import { ObjectFit } from '../utils/prop-types';
import ImageSkeleton from './image.skeleton';
import useRealShape from '../use-real-shape';
import useCurrentState from '../use-current-state';
import useResize from '../use-resize';
import { CSS } from '../theme/stitches.config';
import {
  StyledImage,
  StyledImageContainer,
  ImageContainerVariantProps
} from './image.styles';
import clsx from '../utils/clsx';

interface Props {
  src: string;
  autoResize?: boolean;
  showSkeleton?: boolean;
  width?: number | string;
  height?: number | string;
  maxDelay?: number;
  objectFit?: ObjectFit;
  className?: string;
  css?: CSS;
  // TODO: put this on the docs
  containerCss?: CSS;
}

const defaultProps = {
  showSkeleton: true,
  autoResize: false,
  objectFit: 'scale-down' as ObjectFit,
  maxDelay: 3000,
  className: ''
};

type NativeAttrs = Omit<React.ImgHTMLAttributes<unknown>, keyof Props>;
export type ImageProps = Props &
  typeof defaultProps &
  NativeAttrs &
  ImageContainerVariantProps;

const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  showSkeleton: showSkeletonProp,
  className,
  maxDelay,
  autoResize,
  objectFit,
  containerCss,
  css,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(showSkeletonProp);

  const { w, h } = useMemo(() => {
    return {
      w: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
      h: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto'
    };
  }, [width, height]);

  const [zoomHeight, setZoomHeight, zoomHeightRef] = useCurrentState<string>(h);
  const imageRef = useRef<HTMLImageElement>(null);
  const [shape, updateShape] = useRealShape(imageRef);

  const showAnimation = showSkeletonProp && !!width && !!height;

  const onImageLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!showAnimation) return;
    if (!imageRef.current) return;
    if (imageRef.current.complete) {
      setLoading(false);
      setShowSkeleton(false);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showAnimation) {
        setShowSkeleton(false);
      }
      clearTimeout(timer);
    }, maxDelay);
    return () => clearTimeout(timer);
  }, [loading]);

  /**
   * On mobile devices, the render witdth may be less than CSS width value.
   * If the image is scaled, set the height manually.
   * This is to ensure the aspect ratio of the image.
   *
   * If the image is auto width, ignore all.
   */
  useEffect(() => {
    if (!autoResize) return;
    const notLoaded = shape.width === 0;
    const isAutoZoom = zoomHeightRef.current === 'auto';
    if (notLoaded || !width || !height) return;
    if (shape.width < width) {
      !isAutoZoom && setZoomHeight('auto');
    } else {
      isAutoZoom && setZoomHeight(h);
    }
  }, [shape, width]);

  useResize(() => {
    if (!autoResize) return;
    updateShape();
  });

  const getState = useMemo(() => {
    return loading ? 'loading' : 'ready';
  }, [loading]);

  return (
    <StyledImageContainer
      className={clsx(
        'nextui-image-container',
        `nextui-image--${getState}`,
        className
      )}
      data-state={getState}
      ready={!loading}
      css={{
        ...(containerCss as any),
        width: w,
        height: zoomHeight
      }}
    >
      {showSkeleton && <ImageSkeleton opacity={1} />}
      <StyledImage
        ref={imageRef}
        className="nextui-image"
        width={width}
        height={height}
        onLoad={onImageLoaded}
        src={src}
        data-state={getState}
        alt={props.alt || ''}
        css={{
          objectFit,
          ...(css as any)
        }}
        {...props}
      />
    </StyledImageContainer>
  );
};

type MemoImageComponent<P = {}> = React.NamedExoticComponent<P>;

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Image.defaultProps = defaultProps;

export default React.memo(Image) as MemoImageComponent<ComponentProps>;
