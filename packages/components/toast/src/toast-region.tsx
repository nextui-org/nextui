import {useRef} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {createPortal} from "react-dom";
import {clsx} from "@nextui-org/shared-utils";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";

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
}

export function ToastRegion<T extends ToastProps>({
  toastQueue,
  position,
  ...props
}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const {regionProps} = useToastRegion(props, toastQueue, ref);

  const positionStyles: Record<string, string> = {
    "right-bottom": "bottom-0 right-0 pr-2",
    "left-bottom": "bottom-0 left-0 pl-2",
    "center-bottom": "bottom-0 left-1/2 -translate-x-1/2",
    "right-top": "top-0 right-0 pr-2",
    "left-top": "top-0 left-0 pl-2",
    "center-top": "top-0 left-1/2 -translate-x-1/2",
  };
  const positionStyle = position ? positionStyles[position] : positionStyles["right-bottom"];
  const {hoverProps, isHovered} = useHover({
    isDisabled: false,
  });

  return createPortal(
    <div
      {...mergeProps(regionProps, hoverProps)}
      ref={ref}
      className={clsx("fixed flex flex-col", positionStyle)}
    >
      {toastQueue.visibleToasts.map((toast: QueuedToast<ToastProps>, index) => {
        return (
          <Toast
            key={toast.key}
            state={toastQueue}
            toast={toast}
            {...toast.content}
            index={index}
            isRegionHovered={isHovered}
            position={position}
            total={toastQueue.visibleToasts.length}
          />
        );
      })}
    </div>,
    document.body,
  );
}
