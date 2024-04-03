import type {AriaDialogProps} from "@react-aria/dialog";
import type {HTMLMotionProps} from "framer-motion";

import {cloneElement, isValidElement, ReactNode, useMemo, useCallback, ReactElement} from "react";
import {forwardRef} from "@nextui-org/system";
import {DismissButton} from "@react-aria/overlays";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-utils";
import {CloseIcon} from "@nextui-org/shared-icons";
import {RemoveScroll} from "react-remove-scroll";
import {domAnimation, LazyMotion, m} from "framer-motion";
import {useDialog} from "@react-aria/dialog";
import {mergeProps} from "@react-aria/utils";
import {HTMLNextUIProps} from "@nextui-org/system";

import {useModalContext} from "./modal-context";
import {scaleInOut} from "./modal-transition";

type KeysToOmit = "children" | "role";

export interface ModalContentProps extends AriaDialogProps, HTMLNextUIProps<"div", KeysToOmit> {
  children: ReactNode | ((onClose: () => void) => ReactNode);
}

const ModalContent = forwardRef<"div", ModalContentProps, KeysToOmit>((props, _) => {
  const {as, children, role = "dialog", ...otherProps} = props;

  const {
    Component: DialogComponent,
    domRef,
    slots,
    isOpen,
    classNames,
    motionProps,
    backdrop,
    closeButton,
    hideCloseButton,
    disableAnimation,
    shouldBlockScroll,
    getDialogProps,
    getBackdropProps,
    getCloseButtonProps,
    onClose,
  } = useModalContext();

  const Component = as || DialogComponent || "div";

  const {dialogProps} = useDialog(
    {
      role,
    },
    domRef,
  );

  const closeButtonContent = isValidElement(closeButton) ? (
    cloneElement(closeButton, getCloseButtonProps())
  ) : (
    <button {...getCloseButtonProps()}>
      <CloseIcon />
    </button>
  );

  const content = (
    <Component {...getDialogProps(mergeProps(dialogProps, otherProps))}>
      <DismissButton onDismiss={onClose} />
      {!hideCloseButton && closeButtonContent}
      {typeof children === "function" ? children(onClose) : children}
      <DismissButton onDismiss={onClose} />
    </Component>
  );

  const backdropContent = useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }

    if (disableAnimation) {
      return <div {...getBackdropProps()} />;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          animate="enter"
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.fade}
          {...(getBackdropProps() as HTMLMotionProps<"div">)}
        />
      </LazyMotion>
    );
  }, [backdrop, disableAnimation, getBackdropProps]);

  const RemoveScrollWrapper = useCallback(
    ({children}: {children: ReactElement}) => {
      return (
        <RemoveScroll enabled={shouldBlockScroll && isOpen} removeScrollBar={false}>
          {children}
        </RemoveScroll>
      );
    },
    [shouldBlockScroll, isOpen],
  );

  const contents = disableAnimation ? (
    <RemoveScrollWrapper>
      <div className={slots.wrapper({class: classNames?.wrapper})}>{content}</div>
    </RemoveScrollWrapper>
  ) : (
    <LazyMotion features={domAnimation}>
      <m.div
        animate="enter"
        className={slots.wrapper({class: classNames?.wrapper})}
        exit="exit"
        initial="exit"
        variants={scaleInOut}
        {...motionProps}
      >
        <RemoveScrollWrapper>{content}</RemoveScrollWrapper>
      </m.div>
    </LazyMotion>
  );

  return (
    <div tabIndex={-1}>
      {backdropContent}
      {contents}
    </div>
  );
});

ModalContent.displayName = "NextUI.ModalContent";

export default ModalContent;
