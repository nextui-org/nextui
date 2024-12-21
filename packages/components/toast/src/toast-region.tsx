import {useRef} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";

import Toast from "./toast";
import {ToastType} from "./use-toast";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  toastQueue: ToastState<T>;
}

export function ToastRegion<T extends ToastType>({toastQueue, ...props}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const {regionProps} = useToastRegion(props, toastQueue, ref);

  return (
    <>
      <div
        {...regionProps}
        ref={ref}
        className="fixed bottom-0 left-0 w-screen flex flex-col items-center justify-center"
      >
        {toastQueue.visibleToasts.map((toast: QueuedToast<ToastType>) => {
          return (
            <Toast key={toast.key} state={toastQueue} toast={toast} {...toast.content.config} />
          );
        })}
      </div>
    </>
  );
}
