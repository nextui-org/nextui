import type {CSS} from "../theme/stitches.config";

import React, {ReactNode, useMemo} from "react";
import {useModal, useOverlay, DismissButton} from "@react-aria/overlays";
import {useDialog} from "@react-aria/dialog";
import {FocusScope, useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";

import CSSTransition from "../utils/css-transition";
import {__DEV__} from "../utils/assertion";
import {mergeRefs, ReactRef} from "../utils/refs";
import clsx from "../utils/clsx";

import {
  StyledPopoverContentContainer,
  StyledPopoverContent,
  PopoverContentVariantsProps,
} from "./popover.styles";
import {usePopoverContext} from "./popover-context";
import {getTransformOrigin} from "./utils";

interface Props {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type PopoverContentProps = Props & NativeAttrs & PopoverContentVariantsProps & {css?: CSS};

const PopoverContent = React.forwardRef(
  (props: PopoverContentProps, ref: ReactRef<HTMLDivElement>) => {
    const {children, as, css, className, ...otherProps} = props;

    const {
      state,
      placement,
      overlayRef,
      disableAnimation,
      disableShadow,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
      getPopoverProps,
      isBordered,
      borderWeight,
      onClose,
      onEntered,
      onExited,
      isPositioned,
    } = usePopoverContext();

    const transformOrigin = getTransformOrigin(placement);

    const popoverCss = useMemo<CSS>(() => {
      return {
        transformOrigin,
        ...css,
      };
    }, [transformOrigin, css]);

    // Hide content outside the modal from screen readers.
    const {modalProps} = useModal({isDisabled: true});

    const {dialogProps} = useDialog(
      {
        role: "dialog",
      },
      overlayRef,
    );

    const {overlayProps} = useOverlay(
      {
        onClose,
        isOpen: state.isOpen,
        isDismissable: isDismissable && state.isOpen,
        shouldCloseOnBlur,
        isKeyboardDismissDisabled,
        shouldCloseOnInteractOutside,
      },
      overlayRef,
    );

    const completeProps = mergeProps({isBordered, disableShadow, borderWeight}, otherProps);

    const {isFocusVisible, focusProps} = useFocusRing();

    const transitionProps = useMemo(() => {
      return {
        clearTime: disableAnimation ? 0 : 300,
        enterTime: disableAnimation ? 0 : 20,
        leaveTime: disableAnimation ? 0 : 60,
        name: "nextui-popover-content",
        visible: state.isOpen,
        onEntered: onEntered,
        onExited: onExited,
      };
    }, [disableAnimation, state.isOpen]);

    const contents = (
      <StyledPopoverContentContainer
        ref={mergeRefs(overlayRef, ref)}
        {...getPopoverProps(
          mergeProps(overlayProps, modalProps, dialogProps, focusProps, completeProps),
          popoverCss,
        )}
        as={as}
        className={clsx("nextui-popover-content-container", className)}
        disableAnimation={disableAnimation}
        isFocusVisible={isFocusVisible}
        isPositioned={isPositioned}
      >
        <DismissButton onDismiss={onClose} />
        <StyledPopoverContent className="nextui-popover-content">{children}</StyledPopoverContent>
        <DismissButton onDismiss={onClose} />
      </StyledPopoverContentContainer>
    );

    return (
      <>
        <FocusScope restoreFocus>
          <CSSTransition {...transitionProps}>{contents}</CSSTransition>
        </FocusScope>
      </>
    );
  },
);

if (__DEV__) {
  PopoverContent.displayName = "NextUI.PopoverContent";
}

PopoverContent.toString = () => ".nextui-popover-content";

type PopoverContentComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

export default PopoverContent as PopoverContentComponent<HTMLDivElement, PopoverContentProps>;
