import {useState, useEffect, useMemo} from "react";
import {HTMLNextUIProps, CSS} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useRefState} from "@nextui-org/use-ref-state";
import {useRealShape} from "@nextui-org/use-real-shape";
import {useResize} from "@nextui-org/use-resize";

export interface UseImageProps extends Omit<HTMLNextUIProps<"img">, "height" | "width"> {
  /**
   * The image ref.
   */
  ref?: React.Ref<HTMLImageElement>;
  /**
   * 	The image source (local or remote)
   */
  src: string;
  /**
   * Resize Image to fits screen width
   * @default false
   */
  autoResize?: boolean;
  /**
   * Shows loading Skeleton while image is loading
   * @default true
   */
  showSkeleton?: boolean;
  /**
   * 	Specifies Image width
   */
  width?: number | string;
  /**
   *  Specifies Image height
   */
  height?: number | string;
  /**
   * Specifies how long Image Skeleton Renders Animation
   * @default 3000
   */
  maxDelay?: number;
  /**
   * Property tells the content to fill the container
   */
  objectFit?: CSS["objectFit"];
  /**
   * 	Override default Image container styles
   */
  containerCss?: CSS;

  /**
   * Function to be called when the image is loaded
   */
  onLoad?: () => void;
}

export function useImage(props: UseImageProps) {
  const {
    ref,
    width,
    height,
    showSkeleton: showSkeletonProp = true,
    maxDelay = 3000,
    autoResize = false,
    objectFit = "scale-down",
    onLoad: onLoadProp,
    ...otherProps
  } = props;

  const imageRef = useDOMRef(ref);

  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(showSkeletonProp);

  const {w, h} = useMemo(() => {
    return {
      w: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
      h: height ? (typeof height === "number" ? `${height}px` : height) : "auto",
    };
  }, [width, height]);

  const [zoomHeight, setZoomHeight, zoomHeightRef] = useRefState<string>(h);
  const [shape, updateShape] = useRealShape(imageRef);

  const showAnimation = showSkeletonProp && !!width && !!height;

  const onLoad = () => {
    setIsLoading(false);
    onLoadProp?.();
  };

  useEffect(() => {
    if (!imageRef.current) return;
    if (imageRef.current.complete) {
      setIsLoading(false);
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
  }, [isLoading]);

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
    const isAutoZoom = zoomHeightRef.current === "auto";

    if (notLoaded || !width || !height) return;
    if (shape.width < width) {
      !isAutoZoom && setZoomHeight("auto");
    } else {
      isAutoZoom && setZoomHeight(h);
    }
  }, [shape, width]);

  useResize(() => {
    if (!autoResize) return;
    updateShape();
  });

  const state = useMemo(() => {
    return isLoading ? "loading" : "loaded";
  }, [isLoading]);

  return {
    w,
    state,
    width,
    height,
    imageRef,
    objectFit,
    zoomHeight,
    isLoading,
    showSkeleton,
    onLoad,
    ...otherProps,
  };
}

export type UseImageReturn = ReturnType<typeof useImage>;
