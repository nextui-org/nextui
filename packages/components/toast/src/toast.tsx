import {forwardRef} from "@nextui-org/system";
import {Button, ButtonProps} from "@nextui-org/button";
import {CloseIcon} from "@nextui-org/shared-icons";
import {motion, AnimatePresence} from "framer-motion";
import {Progress} from "@nextui-org/progress";

import {UseToastProps, useToast} from "./use-toast";

export interface ToastProps extends UseToastProps {}

const Toast = forwardRef<"div", ToastProps>((props, ref) => {
  const {
    Component,
    Icon,
    domRef,
    endContent,
    closeProgressBarValue,
    getToastProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getProgressBarProps,
    getCloseButtonProps,
    getIconProps,
  } = useToast({
    ...props,
    ref,
  });

  const toastVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 50},
  };

  return (
    <AnimatePresence>
      <motion.div
        animate="visible"
        exit="exit"
        initial="hidden"
        transition={{duration: 0.3}}
        variants={toastVariants}
      >
        <Component ref={domRef} {...getToastProps()}>
          <main {...getContentProps()}>
            <Icon {...getIconProps()} />
            <div>
              <div {...getTitleProps()}>{props.toast.content.title}</div>
              <div {...getDescriptionProps()}>{props.toast.content.description}</div>
            </div>
          </main>
          <Button {...(getCloseButtonProps() as ButtonProps)} isIconOnly variant="bordered">
            <CloseIcon />
          </Button>
          {endContent}
          <Progress
            {...getProgressBarProps()}
            aria-label="toast-close-indicator"
            value={closeProgressBarValue}
          />
        </Component>
      </motion.div>
    </AnimatePresence>
  );
});

Toast.displayName = "NextUI.Toast";

export default Toast;
