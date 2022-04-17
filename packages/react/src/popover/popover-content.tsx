import React, { useCallback, useState, ReactNode, RefObject } from 'react';
import { useModal, useOverlay, DismissButton } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
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
      onClose
    } = usePopoverContext();

    const [exited, setExited] = useState(!state.isOpen);

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
        isOpen: state.isOpen,
        onClose: state.close,
        shouldCloseOnBlur,
        isDismissable: isDismissable && state.isOpen,
        isKeyboardDismissDisabled
      },
      overlayRef
    );

    const handleEntered = useCallback(() => {
      setExited(false);
    }, []);

    const handleExited = useCallback(() => {
      setExited(true);
    }, []);

    // Don't un-render the overlay while it's transitioning out.
    const mountOverlay = state.isOpen || !exited;
    if (!mountOverlay && !disableAnimation) {
      // Don't bother showing anything if we don't have to.
      return null;
    }

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
          <CSSTransition
            visible={state.isOpen}
            name="nextui-popover-content"
            enterTime={20}
            leaveTime={60}
            clearTime={300}
            onExited={handleExited}
            onEntered={handleEntered}
          >
            {contents}
          </CSSTransition>
        ) : state.isOpen ? (
          contents
        ) : null}
      </>
    );
  }
);

if (__DEV__) {
  PopoverContent.displayName = 'NextUI.PopoverContent';
}

PopoverContent.toString = () => '.nextui-popover-content';
