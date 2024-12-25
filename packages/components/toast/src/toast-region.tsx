import {useRef} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";

import Toast from "./toast";
import {ToastProps} from "./use-toast";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  toastQueue: ToastState<T>;
}

export function ToastRegion<T extends ToastProps>({toastQueue, ...props}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const {regionProps} = useToastRegion(props, toastQueue, ref);

  return (
    <>
      <div
        {...regionProps}
        ref={ref}
        className="fixed bottom-6 right-6 w-screen flex flex-col items-end justify-center"
      >
        {toastQueue.visibleToasts.map((toast: QueuedToast<ToastProps>) => {
          return <Toast key={toast.key} state={toastQueue} toast={toast} {...toast.content} />;
        })}
      </div>
    </>
  );
}
