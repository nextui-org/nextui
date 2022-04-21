import React, { useEffect, useMemo, useState } from 'react';
import { ObjectFit } from '../utils/prop-types';
import ImageSkeleton from './image.skeleton';
import useRealShape from '../use-real-shape';
import useCurrentState from '../use-current-state';
import useResize from '../use-resize';
import { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
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

export const Image = React.forwardRef(
  (props: ImageProps, ref: ReactRef<HTMLImageElement>) => {
    const {
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
      ...otherProps
    } = props;

    const imageRef = useDOMRef(ref);

    const [loading, setLoading] = useState<boolean>(true);
    const [showSkeleton, setShowSkeleton] = useState<boolean>(showSkeletonProp);

    const { w, h } = useMemo(() => {
      return {
        w: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        h: height
          ? typeof height === 'number'
            ? `${height}px`
            : height
          : 'auto'
      };
    }, [width, height]);

    const [zoomHeight, setZoomHeight, zoomHeightRef] =
      useCurrentState<string>(h);
    const [shape, updateShape] = useRealShape(imageRef);

    const showAnimation = showSkeletonProp && !!width && !!height;

    const onImageLoaded = () => {
      setLoading(false);
    };

    useEffect(() => {
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
        ready={!loading || showSkeleton}
        css={{
          width: w,
          height: zoomHeight,
          ...(containerCss as any)
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
          {...otherProps}
        />
      </StyledImageContainer>
    );
  }
);

if (__DEV__) {
  Image.displayName = 'NextUI.Image';
}

Image.toString = () => '.nextui-image';

type MemoImageComponent<P = {}> = React.NamedExoticComponent<P>;

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Image.defaultProps = defaultProps;

export default React.memo(Image) as MemoImageComponent<ComponentProps>;
