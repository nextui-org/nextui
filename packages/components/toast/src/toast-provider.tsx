import {ToastOptions, ToastQueue, useToastQueue} from "@react-stately/toast";

import {ToastRegion} from "./toast-region";
import {ToastProps} from "./use-toast";

let globalToastQueue: ToastQueue<ToastProps> | null = null;

interface ToastProviderProps {
  maxVisibleToasts?: number;
}

export const getToastQueue = (maxVisibleToasts: number) => {
  if (!globalToastQueue) {
    globalToastQueue = new ToastQueue({
      maxVisibleToasts,
    });
  }

  return globalToastQueue;
};

export const ToastProvider = ({maxVisibleToasts = 5}: ToastProviderProps) => {
  const toastQueue = useToastQueue(getToastQueue(maxVisibleToasts));

  if (toastQueue.visibleToasts.length == 0) {
    return null;
  }

  return <ToastRegion toastQueue={toastQueue} />;
};

export const addToast = ({...props}: ToastProps & ToastOptions) => {
  if (!globalToastQueue) {
    return;
  }

  const options: Partial<ToastOptions> = {
    timeout: props?.timeout,
    priority: props?.priority,
  };

  globalToastQueue.add(props, options);
};
