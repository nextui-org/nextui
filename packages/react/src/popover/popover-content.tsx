import React, { ReactNode } from "react";
import { useModal, useOverlay, DismissButton } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

import { CSS } from "../theme/stitches.config";
import CSSTransition from "../utils/css-transition";
import { __DEV__ } from "../utils/assertion";
import { mergeRefs, ReactRef } from "../utils/refs";
import clsx from "../utils/clsx";

import {
  StyledPopoverContentContainer,
  StyledPopoverContent,
  PopoverContentVariantsProps,
} from "./popover.styles";
import { usePopoverContext } from "./popover-context";
import { getTransformOrigin } from "./utils";

interface Props {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type PopoverContentProps = Props &
  NativeAttrs &
  PopoverContentVariantsProps & { css?: CSS };

const PopoverContent = React.forwardRef(
  (props: PopoverContentProps, ref: ReactRef<HTMLDivElement>) => {
    const { children, as, css, className, ...otherProps } = props;

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
    } = usePopoverContext();

    const transformOrigin = getTransformOrigin(placement);

    // Hide content outside the modal from screen readers.
    const { modalProps } = useModal({ isDisabled: true });

    const { dialogProps } = useDialog(
      {
        role: "dialog",
      },
      overlayRef
    );

    const { overlayProps } = useOverlay(
      {
        onClose,
        isOpen: state.isOpen,
        isDismissable: isDismissable && state.isOpen,
        shouldCloseOnBlur,
        isKeyboardDismissDisabled,
        shouldCloseOnInteractOutside,
      },
      overlayRef
    );

    const completeProps = mergeProps(
      { isBordered, disableShadow, borderWeight },
      otherProps
    );

    const { isFocusVisible, focusProps } = useFocusRing();

    const contents = (
      <StyledPopoverContentContainer
        ref={mergeRefs(overlayRef, ref)}
        {...getPopoverProps(
          mergeProps(
            overlayProps,
            modalProps,
            dialogProps,
            focusProps,
            completeProps
          )
        )}
        as={as}
        className={clsx("nextui-popover-content-container", className)}
        css={{
          transformOrigin,
          ...(css as any),
        }}
        isFocusVisible={isFocusVisible}
      >
        <DismissButton onDismiss={onClose} />
        <StyledPopoverContent className="nextui-popover-content">
          {children}
        </StyledPopoverContent>
        <DismissButton onDismiss={onClose} />
      </StyledPopoverContentContainer>
    );

    // Unfortunately the popover without animation is has problems with rerendering after opening state change.
    // If we disable animation by setting arbitary values we enforce a rerender and react-aria is able
    // to correctly define position state because the DOM element 'exists'.
    const animationProps = {
      visible: state.isOpen,
      enterTime: !disableAnimation ? 20 : 0,
      leaveTime: !disableAnimation ? 60 : 0,
      clearTime: !disableAnimation ? 300 : 0,
      name: !disableAnimation ? "nextui-popover-content" : "",
      onEntered: onEntered,
      onExited: onExited,
    };

    return (
      <>
        {state.isOpen ? (
          <FocusScope restoreFocus>
            <CSSTransition {...animationProps}>{contents}</CSSTransition>
          </FocusScope>
        ) : null}
      </>
    );
  }
);

if (__DEV__) {
  PopoverContent.displayName = "NextUI.PopoverContent";
}

PopoverContent.toString = () => ".nextui-popover-content";

type PopoverContentComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

export default PopoverContent as PopoverContentComponent<
  HTMLDivElement,
  PopoverContentProps
>;
