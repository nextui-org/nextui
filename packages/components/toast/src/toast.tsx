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
import {cloneElement, isValidElement, useState} from "react";

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
    color,
    hideIcon,
    position,
    toast,
    state,
    disableAnimation,
    progressBarRef,
    classNames,
    slots,
    isProgressBarVisible,
    getToastProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
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
  const [isOut, setIsOut] = useState(false);

  const handleDragEnd = (offsetX: number, offsetY: number) => {
    if (position.includes("right")) {
      if (offsetX < 50) {
        return;
      }
      setIsOut(true);
      state.close(toast.key);
    }
    if (position.includes("left")) {
      if (offsetX > -50) {
        return;
      }
      setIsOut(true);
      state.close(toast.key);
    }
    if (position == "center-top") {
      if (offsetY > -50) {
        return;
      }
      setIsOut(true);
      state.close(toast.key);
    }
    if (position == "center-bottom") {
      if (offsetY < 50) {
        return;
      }
      setIsOut(true);
      state.close(toast.key);
    }
  };

  const toastContent = (
    <Component ref={domRef} {...getToastProps()}>
      <main {...getContentProps()}>
        {hideIcon ? null : customIcon || <IconComponent {...getIconProps()} />}
        <div>
          <div {...getTitleProps()}>{props.toast.content.title}</div>
          <div {...getDescriptionProps()}>{props.toast.content.description}</div>
          {isProgressBarVisible && (
            <div className={slots.progressTrack({class: classNames?.progressTrack})}>
              <div
                ref={progressBarRef}
                className={slots.progressIndicator({class: classNames?.progressIndicator})}
              />
            </div>
          )}
        </div>
      </main>
      <Button {...(getCloseButtonProps() as ButtonProps)} isIconOnly variant="bordered">
        <CloseIcon />
      </Button>
      {endContent}
    </Component>
  );

  return (
    <>
      {disableAnimation ? (
        toastContent
      ) : (
        <AnimatePresence>
          <motion.div
            animate={isOut ? {x: "100vw"} : "visible"}
            drag={position.includes("center") ? "y" : "x"}
            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
            exit="exit"
            initial="hidden"
            transition={{duration: 0.5}}
            variants={toastVariants}
            onDragEnd={(_, info) => {
              const offsetX = info.offset.x;
              const offsetY = info.offset.y;

              handleDragEnd(offsetX, offsetY);
            }}
          >
            {toastContent}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
});

Toast.displayName = "NextUI.Toast";

export default Toast;
