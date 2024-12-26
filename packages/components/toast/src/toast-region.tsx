import {useRef} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {createPortal} from "react-dom";
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
}

export function ToastRegion<T extends ToastProps>({
  toastQueue,
  position,
  ...props
}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const {regionProps} = useToastRegion(props, toastQueue, ref);
  let positionStyle;

  switch (position) {
    case "right-bottom":
      positionStyle = "bottom-0 right-0 pr-2";
      break;
    case "left-bottom":
      positionStyle = "bottom-0 left-0 pl-2";
      break;
    case "center-bottom":
      positionStyle = "bottom-0 left-1/2 -translate-x-1/2";
      break;
    case "right-top":
      positionStyle = "top-0 right-0 pr-2";
      break;
    case "left-top":
      positionStyle = "top-0 left-0 pl-2";
      break;
    case "center-top":
      positionStyle = "top-0 left-1/2 -translate-x-1/2";
      break;
  }

  return createPortal(
    <div {...regionProps} ref={ref} className={clsx("fixed flex flex-col", positionStyle)}>
      {toastQueue.visibleToasts.map((toast: QueuedToast<ToastProps>) => {
        return (
          <Toast
            key={toast.key}
            state={toastQueue}
            toast={toast}
            {...toast.content}
            position={position}
          />
        );
      })}
    </div>,
    document.body,
  );
}
