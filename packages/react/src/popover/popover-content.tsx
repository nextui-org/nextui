import React, { ReactNode } from 'react';
import { useModal, useOverlay, DismissButton } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { CSS } from '../theme/stitches.config';
import CSSTransition from '../utils/css-transition';
import { __DEV__ } from '../utils/assertion';
import { mergeRefs, ReactRef } from '../utils/refs';
import {
  StyledPopoverContentContainer,
  StyledPopoverContent
} from './popover.styles';
import { usePopoverContext } from './popover-context';
import { getTransformOrigin } from './utils';
import clsx from '../utils/clsx';

interface Props {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type PopoverContentProps = Props & NativeAttrs & { css?: CSS };

export const PopoverContent = React.forwardRef(
  (props: PopoverContentProps, ref: ReactRef<HTMLDivElement>) => {
    const { children, as, css, className, ...otherProps } = props;

    const {
      state,
      placement,
      overlayRef,
      disableAnimation,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
      getPopoverProps,
      onClose,
      onEntered,
      onExited
    } = usePopoverContext();

    const transformOrigin = getTransformOrigin(placement);

    // Hide content outside the modal from screen readers.
    const { modalProps } = useModal({ isDisabled: true });

    const { dialogProps } = useDialog(
      {
        role: 'dialog'
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
        shouldCloseOnInteractOutside
      },
      overlayRef
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
            otherProps
          )
        )}
        className={clsx('nextui-popover-content-container', className)}
        isFocusVisible={isFocusVisible}
        as={as}
        css={{
          transformOrigin,
          ...(css as any)
        }}
      >
        <DismissButton onDismiss={onClose} />
        <StyledPopoverContent className="nextui-popover-content">
          {children}
        </StyledPopoverContent>
        <DismissButton onDismiss={onClose} />
      </StyledPopoverContentContainer>
    );

    return (
      <>
        {!disableAnimation ? (
          <FocusScope restoreFocus>
            <CSSTransition
              visible={state.isOpen}
              name="nextui-popover-content"
              enterTime={20}
              leaveTime={60}
              clearTime={300}
              onExited={onExited}
              onEntered={onEntered}
            >
              {contents}
            </CSSTransition>
          </FocusScope>
        ) : state.isOpen ? (
          <FocusScope restoreFocus>{contents}</FocusScope>
        ) : null}
      </>
    );
  }
);

if (__DEV__) {
  PopoverContent.displayName = 'NextUI.PopoverContent';
}

PopoverContent.toString = () => '.nextui-popover-content';
