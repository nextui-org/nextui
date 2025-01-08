import {useEffect, useRef, useState} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {clsx} from "@nextui-org/shared-utils";

import Toast from "./toast";
import {ToastProps} from "./use-toast";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  toastQueue: ToastState<T>;
  placement?:
    | "right-bottom"
    | "left-bottom"
    | "center-bottom"
    | "right-top"
    | "left-top"
    | "center-top";
  disableAnimation: boolean;
  maxVisibleToasts: number;
}

export function ToastRegion<T extends ToastProps>({
  toastQueue,
  placement,
  disableAnimation,
  maxVisibleToasts,
  ...props
}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const {regionProps} = useToastRegion(props, toastQueue, ref);
  const {hoverProps, isHovered} = useHover({
    isDisabled: false,
  });

  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    function handleTouchOutside(event: TouchEvent) {
      if (ref.current && !(ref.current as HTMLDivElement).contains(event.target as Node)) {
        setIsTouched(false);
      }
    }
    function handlePointerMove() {
      setIsTouched(false);
    }

    document.addEventListener("touchstart", handleTouchOutside);
    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, []);

  const placementStyles: Record<string, string> = {
    "right-bottom": "fixed flex flex-col bottom-0 right-0 pr-2",
    "left-bottom": "fixed flex flex-col bottom-0 left-0 pl-2",
    "center-bottom": "fixed flex flex-col bottom-0 left-1/2 -translate-x-1/2",
    "right-top": "fixed flex flex-col top-0 right-0 pr-2",
    "left-top": "fixed flex flex-col top-0 left-0 pl-2",
    "center-top": "fixed flex flex-col top-0 left-1/2 -translate-x-1/2",
  };
  const placementStyle = placement ? placementStyles[placement] : placementStyles["right-bottom"];
  const [heights, setHeights] = useState<number[]>([]);
  const total = toastQueue.visibleToasts.length;
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  return (
    <div
      {...mergeProps(regionProps, hoverProps)}
      ref={ref}
      className={clsx(disableAnimation ? placementStyle : "")}
      data-placement={placement}
      onTouchStart={handleTouchStart}
    >
      {toastQueue.visibleToasts.map((toast: QueuedToast<ToastProps>, index) => {
        if (disableAnimation && total - index > maxVisibleToasts) {
          return null;
        }

        if (total - index <= 4 || (isHovered && total - index <= maxVisibleToasts + 1)) {
          return (
            <Toast
              key={toast.key}
              state={toastQueue}
              toast={toast}
              {...toast.content}
              disableAnimation={disableAnimation}
              heights={heights}
              index={index}
              isRegionExpanded={isHovered || isTouched}
              placement={placement}
              setHeights={setHeights}
              total={total}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
