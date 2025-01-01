import {useRef, useState} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {createPortal} from "react-dom";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {clsx} from "@nextui-org/shared-utils";

import Toast from "./toast";
import {ToastProps} from "./use-toast";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  toastQueue: ToastState<T>;
  position?:
    | "right-bottom"
    | "left-bottom"
    | "center-bottom"
    | "right-top"
    | "left-top"
    | "center-top";
  disableAnimation: boolean;
}

export function ToastRegion<T extends ToastProps>({
  toastQueue,
  position,
  disableAnimation,
  ...props
}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const {regionProps} = useToastRegion(props, toastQueue, ref);
  const {hoverProps, isHovered} = useHover({
    isDisabled: false,
  });

  const positionStyles: Record<string, string> = {
    "right-bottom": "fixed flex flex-col bottom-0 right-0 pr-2",
    "left-bottom": "fixed flex flex-col bottom-0 left-0 pl-2",
    "center-bottom": "fixed flex flex-col bottom-0 left-1/2 -translate-x-1/2",
    "right-top": "fixed flex flex-col top-0 right-0 pr-2",
    "left-top": "fixed flex flex-col top-0 left-0 pl-2",
    "center-top": "fixed flex flex-col top-0 left-1/2 -translate-x-1/2",
  };
  const positionStyle = position ? positionStyles[position] : positionStyles["right-bottom"];
  const [heights, setHeights] = useState<number[]>([]);

  return createPortal(
    <div
      {...mergeProps(regionProps, hoverProps)}
      ref={ref}
      className={clsx(disableAnimation ? positionStyle : "")}
    >
      {toastQueue.visibleToasts.map((toast: QueuedToast<ToastProps>, index) => {
        return (
          <Toast
            key={toast.key}
            state={toastQueue}
            toast={toast}
            {...toast.content}
            disableAnimation={disableAnimation}
            heights={heights}
            index={index}
            isRegionHovered={isHovered}
            position={position}
            setHeights={setHeights}
            total={toastQueue.visibleToasts.length}
          />
        );
      })}
    </div>,
    document.body,
  );
}
