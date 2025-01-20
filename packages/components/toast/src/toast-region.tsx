import {useEffect, useMemo, useRef, useState} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {toastRegion} from "@heroui/theme";

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

  const slots = useMemo(
    () =>
      toastRegion({
        disableAnimation,
      }),
    [disableAnimation],
  );

  useEffect(() => {
    function handleTouchOutside(event: TouchEvent) {
      if (ref.current && !(ref.current as HTMLDivElement).contains(event.target as Node)) {
        setIsTouched(false);
      }
    }
    document.addEventListener("touchstart", handleTouchOutside);

    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, []);

  const [heights, setHeights] = useState<number[]>([]);
  const total = toastQueue.visibleToasts?.length ?? 0;
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  return (
    <div
      {...mergeProps(regionProps, hoverProps)}
      ref={ref}
      className={slots.base()}
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
