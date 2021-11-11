import React, { useEffect, useRef, useMemo, useState } from 'react';
import { ObjectFit } from '../utils/prop-types';
import useTheme from '../use-theme';
import ImageSkeleton from './image.skeleton';
import ImageBrowser from './image-browser';
import useRealShape from '../use-real-shape';
import useCurrentState from '../use-current-state';
import useResize from '../use-resize';
import cslx from '../utils/clsx';

interface Props {
  src: string;
  autoResize?: boolean;
  showSkeleton?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  maxDelay?: number;
  objectFit?: ObjectFit;
}

const defaultProps = {
  showSkeleton: true,
  autoResize: true,
  objectFit: 'scale-down' as ObjectFit,
  className: '',
  maxDelay: 3000
};

type NativeAttrs = Omit<React.ImgHTMLAttributes<unknown>, keyof Props>;
export type ImageProps = Props & typeof defaultProps & NativeAttrs;

const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  showSkeleton: showSkeletonProp,
  className,
  maxDelay,
  autoResize,
  objectFit,
  ...props
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  const { w, h } = useMemo(() => {
    return {
      w: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
      h: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto'
    };
  }, [width, height]);

  const [zoomHeight, setZoomHeight, zoomHeightRef] = useCurrentState<string>(h);
  const imageRef = useRef<HTMLImageElement>(null);
  const [shape, updateShape] = useRealShape(imageRef);

  const showAnimation = showSkeletonProp && width && height;

  const imageLoaded = () => {
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

  return (
    <div className={cslx('image', { 'image-ready': !loading }, className)}>
      {showSkeleton && showAnimation && (
        <ImageSkeleton opacity={loading ? 0.5 : 0} />
      )}
      <img
        ref={imageRef}
        width={width}
        height={height}
        onLoad={imageLoaded}
        src={src}
        alt={props.alt || ''}
        {...props}
      />
      <style jsx>{`
        .image {
          width: ${w};
          opacity: 0;
          height: ${zoomHeight};
          margin: 0 auto;
          position: relative;
          border-radius: ${theme.radius.lg};
          overflow: hidden;
          max-width: 100%;
          transition: transform 250ms ease 0ms, opacity 200ms ease-in 0ms;
        }
        .image-ready {
          opacity: 1;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: ${objectFit};
          display: block;
        }
      `}</style>
    </div>
  );
};

type MemoImageComponent<P = {}> = React.NamedExoticComponent<P> & {
  Browser: typeof ImageBrowser;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Image.defaultProps = defaultProps;

export default React.memo(Image) as MemoImageComponent<ComponentProps>;
