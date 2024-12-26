import {forwardRef} from "@nextui-org/system";
import {Button, ButtonProps} from "@nextui-org/button";
import {
  CloseIcon,
  DangerIcon,
  InfoFilledIcon,
  SuccessIcon,
  WarningIcon,
} from "@nextui-org/shared-icons";
import {motion, AnimatePresence} from "framer-motion";
import {Progress} from "@nextui-org/progress";
import {cloneElement, isValidElement} from "react";

import {UseToastProps, useToast} from "./use-toast";

export interface ToastProps extends UseToastProps {}

const iconMap = {
  primary: InfoFilledIcon,
  secondary: InfoFilledIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

const Toast = forwardRef<"div", ToastProps>((props, ref) => {
  const {
    Component,
    icon,
    domRef,
    endContent,
    closeProgressBarValue,
    color,
    hideIcon,
    position,
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

  const toastVariants = position.includes("bottom")
    ? {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0},
        exit: {opacity: 0, y: 50},
      }
    : {
        hidden: {opacity: 0, y: -50},
        visible: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -50},
      };

  const customIcon = icon && isValidElement(icon) ? cloneElement(icon, getIconProps()) : null;
  const IconComponent = iconMap[color] || iconMap.primary;

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
            {!hideIcon ? customIcon || <IconComponent {...getIconProps()} /> : null}
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
