import React, { useEffect, useRef, useState } from 'react';
import useTheme from '../use-theme';
import ImageSkeleton from './image.skeleton';
import ImageBrowser from './image-browser';
import useRealShape from '../use-real-shape';
import useCurrentState from '../use-current-state';
import useResize from '../use-resize';

interface Props {
  src: string;
  disableAutoResize?: boolean;
  disableSkeleton?: boolean;
  width?: number;
  height?: number;
  className?: string;
  scale?: string;
  maxDelay?: number;
}

const defaultProps = {
  disableSkeleton: false,
  disableAutoResize: false,
  className: '',
  scale: '100%',
  maxDelay: 3000,
};

type NativeAttrs = Omit<React.ImgHTMLAttributes<unknown>, keyof Props>;
export type ImageProps = Props & typeof defaultProps & NativeAttrs;

const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  disableSkeleton,
  className,
  scale,
  maxDelay,
  disableAutoResize,
  ...props
}) => {
  const showAnimation = !disableSkeleton && width && height;
  const w = width ? `${width}px` : 'auto';
  const h = height ? `${height}px` : 'auto';

  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [zoomHeight, setZoomHeight, zoomHeightRef] = useCurrentState<string>(h);
  const imageRef = useRef<HTMLImageElement>(null);
  const [shape, updateShape] = useRealShape(imageRef);

  const imageLoaded = () => {
    if (!showAnimation) return;
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
    if (disableAutoResize) return;
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
    if (disableAutoResize) return;
    updateShape();
  });

  return (
    <div className={`image ${className}`}>
      {showSkeleton && showAnimation && (
        <ImageSkeleton opacity={loading ? 0.5 : 0} />
      )}
      <img
        ref={imageRef}
        width={width}
        height={height}
        onLoad={imageLoaded}
        src={src}
        {...props}
      />
      <style jsx>{`
        .image {
          width: ${w};
          height: ${zoomHeight};
          margin: 0 auto;
          position: relative;
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          max-width: 100%;
        }

        img {
          width: ${scale};
          height: ${scale};
          object-fit: scale-down;
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
