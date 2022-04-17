import React, { ReactNode, RefObject } from 'react';
import { useModal, useOverlay, DismissButton } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { CSS } from '../theme/stitches.config';
import CSSTransition from '../utils/css-transition';
import { __DEV__ } from '../utils/assertion';
import { mergeRefs } from '../utils/refs';
import { StyledPopoverContent } from './popover.styles';
import { usePopoverContext } from './popover-context';
import { getTransformOrigin } from './utils';

interface Props {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type PopoverContentProps = Props & NativeAttrs & { css?: CSS };

export const PopoverContent = React.forwardRef(
  (props: PopoverContentProps, ref: RefObject<HTMLElement>) => {
    const { children, as, css, ...otherProps } = props;

    const {
      state,
      placement,
      overlayRef,
      disableAnimation,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
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
        isKeyboardDismissDisabled
      },
      overlayRef
    );

    const contents = (
      <StyledPopoverContent
        {...getPopoverProps(
          mergeProps(overlayProps, modalProps, dialogProps, otherProps)
        )}
        ref={mergeRefs(overlayRef, ref)}
        as={as}
        css={{
          transformOrigin,
          ...(css as any)
        }}
      >
        <DismissButton onDismiss={onClose} />
        {children}
        <DismissButton onDismiss={onClose} />
      </StyledPopoverContent>
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
