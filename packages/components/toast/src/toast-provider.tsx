import {ToastOptions, ToastQueue, useToastQueue} from "@react-stately/toast";
import {ToastVariantProps} from "@nextui-org/theme";

import {ToastRegion} from "./toast-region";
import {ToastType} from "./use-toast";

let globalToastQueue: ToastQueue<ToastType> | null = null;

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

  return <>{<ToastRegion toastQueue={toastQueue} />}</>;
};

export const addToast = ({
  title,
  description,
  priority,
  timeout,
  ...config
}: {
  title: string;
  description: string;
} & ToastOptions &
  ToastVariantProps) => {
  if (!globalToastQueue) {
    return;
  }

  const content: ToastType = {
    title,
    description,
    config: config,
  };

  const options: Partial<ToastOptions> = {
    timeout,
    priority,
  };

  globalToastQueue.add(content, options);
};
