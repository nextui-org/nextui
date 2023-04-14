import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {DOMAttributes, ReactNode, useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {FocusScope} from "@react-aria/focus";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";
import {motion} from "framer-motion";
import {useDialog} from "@react-aria/dialog";
import {mergeProps} from "@react-aria/utils";
import {FocusableElement} from "@react-types/shared";

import {useModalContext} from "./modal-context";

export interface ModalContentProps extends AriaDialogProps {
  children: ReactNode | ((titleProps: DOMAttributes<FocusableElement>) => ReactNode);
}

const ModalContent = forwardRef<ModalContentProps, "section">((props, _) => {
  const {as, children, ...otherProps} = props;

  const {
    Component: DialogComponent,
    dialogRef,
    slots,
    classNames,
    motionProps,
    backdropVariant,
    disableAnimation,
    getDialogProps,
    getBackdropProps,
    onClose,
  } = useModalContext();

  const Component = as || DialogComponent || "section";

  const {dialogProps, titleProps} = useDialog(
    {
      role: "dialog",
    },
    dialogRef,
  );

  const content = (
    <>
      <DismissButton onDismiss={onClose} />
      <Component {...getDialogProps(mergeProps(dialogProps, otherProps))}>
        <FocusScope contain restoreFocus>
          {typeof children === "function" ? children(titleProps) : children}
        </FocusScope>
      </Component>
      <DismissButton onDismiss={onClose} />
    </>
  );

  const backdrop = useMemo(() => {
    if (backdropVariant === "transparent") {
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
  }, [backdropVariant, disableAnimation, getBackdropProps]);

  return (
    <div tabIndex={-1}>
      {backdrop}
      {disableAnimation ? (
        <div className={slots.wrapper({class: classNames?.wrapper})}>content</div>
      ) : (
        <motion.div
          animate="enter"
          className={slots.wrapper({class: classNames?.wrapper})}
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.scaleSpring}
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
