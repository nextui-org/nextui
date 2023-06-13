import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {ReactNode, useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {CloseIcon} from "@nextui-org/shared-icons";
import {motion} from "framer-motion";
import {useDialog} from "@react-aria/dialog";
import {mergeProps} from "@react-aria/utils";

import {useModalContext} from "./modal-context";

export interface ModalContentProps extends AriaDialogProps {
  children: ReactNode | ((onClose: () => void) => ReactNode);
}

const ModalContent = forwardRef<ModalContentProps, "section">((props, _) => {
  const {as, children, ...otherProps} = props;

  const {
    Component: DialogComponent,
    dialogRef,
    slots,
    classNames,
    motionProps,
    backdrop,
    showCloseButton,
    disableAnimation,
    getDialogProps,
    getBackdropProps,
    getCloseButtonProps,
    onClose,
  } = useModalContext();

  const Component = as || DialogComponent || "section";

  const {dialogProps} = useDialog(
    {
      role: "dialog",
    },
    dialogRef,
  );

  const content = (
    <>
      <DismissButton onDismiss={onClose} />
      <Component {...getDialogProps(mergeProps(dialogProps, otherProps))}>
        {showCloseButton && (
          <button {...getCloseButtonProps()}>
            <CloseIcon />
          </button>
        )}
        {typeof children === "function" ? children(onClose) : children}
      </Component>
      <DismissButton onDismiss={onClose} />
    </>
  );

  const backdropContent = useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }

    if (disableAnimation) {
      return <div {...getBackdropProps()} />;
    }

    return (
      <motion.div
        animate="enter"
        exit="exit"
        initial="exit"
        variants={TRANSITION_VARIANTS.fade}
        {...(getBackdropProps() as HTMLMotionProps<"div">)}
      />
    );
  }, [backdrop, disableAnimation, getBackdropProps]);

  return (
    <div tabIndex={-1}>
      {backdropContent}
      {disableAnimation ? (
        <div className={slots.wrapper({class: classNames?.wrapper})}>{content}</div>
      ) : (
        <motion.div
          animate="enter"
          className={slots.wrapper({class: classNames?.wrapper})}
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.scaleInOut}
          {...motionProps}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
});

ModalContent.displayName = "NextUI.ModalContent";

export default ModalContent;
