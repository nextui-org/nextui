import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  RefAttributes,
  ReactNode,
  PropsWithoutRef,
  HTMLAttributes
} from 'react';
import {
  OverlayContainer,
  useOverlayPosition,
  useOverlayTrigger
} from '@react-aria/overlays';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { CSS } from '../theme/stitches.config';
import CSSTransition from '../utils/css-transition';
import { useDOMRef } from '../utils/dom';
import withDefaults from '../utils/with-defaults';
import { getAriaPlacement, PopoverPlacement } from './utils';
import PopoverContent from './popover-content';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  open?: boolean;
  initialOpen?: boolean;
  placement?: PopoverPlacement;
  arrowProps?: HTMLAttributes<HTMLElement>;
  hideArrow?: boolean;
  nonModal?: boolean;
  animated?: boolean;
  dismissable?: boolean;
  shouldFlip?: boolean;
  shouldCloseOnBlur?: boolean;
  keyboardDismissDisabled?: boolean;
  offset?: number;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

const defaultProps = {
  placement: 'bottom',
  dismissable: true,
  shouldFlip: true,
  offset: 12,
  nonModal: true,
  animated: true
};

export type PopoverProps = Props & { css?: CSS };

const Popover = React.forwardRef(
  (props: PopoverProps, ref: React.Ref<HTMLDivElement | null>) => {
    const {
      children,
      open,
      initialOpen,
      onOpenChange,
      placement,
      offset,
      nonModal,
      animated,
      dismissable,
      shouldFlip,
      shouldCloseOnBlur,
      keyboardDismissDisabled,
      ...otherProps
    } = props;

    const state = useOverlayTriggerState({
      isOpen: open,
      defaultOpen: initialOpen,
      onOpenChange
    });

    const [exited, setExited] = useState(!state.isOpen);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const domRef = useDOMRef(ref);

    const overlayTriggerRef = domRef || triggerRef;
    const overlayRef = useRef<HTMLElement>(null);

    const { triggerProps, overlayProps } = useOverlayTrigger(
      { type: 'dialog' },
      state,
      overlayTriggerRef
    );

    const { overlayProps: positionProps } = useOverlayPosition({
      isOpen: state.isOpen,
      targetRef: overlayTriggerRef,
      placement: getAriaPlacement(placement),
      overlayRef,
      shouldFlip,
      offset
    });

    const { buttonProps } = useButton(
      {
        onPress: () => state.open()
      },
      overlayTriggerRef
    );

    const getState = useMemo(() => {
      if (state.isOpen) return 'open';
      return 'closed';
    }, [state.isOpen]);

    const handleEntered = useCallback(() => {
      setExited(false);
    }, []);

    const handleExited = useCallback(() => {
      setExited(true);
    }, []);

    const renderChildren = useMemo(() => {
      // Don't un-render the overlay while it's transitioning out.
      const mountOverlay = state.isOpen || !exited;
      if (!mountOverlay) {
        // Don't bother showing anything if we don't have to.
        return null;
      }
      return (
        <OverlayContainer>
          <FocusScope restoreFocus>
            <PopoverContent
              ref={overlayRef}
              open={state.isOpen}
              dismissable={dismissable}
              shouldCloseOnBlur={shouldCloseOnBlur}
              keyboardDismissDisabled={keyboardDismissDisabled}
              nonModal={nonModal}
              onClose={state.close}
              data-state={getState}
              data-side={placement}
              {...mergeProps(overlayProps, positionProps, otherProps)}
            >
              {children}
            </PopoverContent>
          </FocusScope>
        </OverlayContainer>
      );
    }, [
      state,
      exited,
      nonModal,
      dismissable,
      overlayProps,
      positionProps,
      otherProps,
      children
    ]);

    return (
      <>
        <button
          ref={overlayTriggerRef}
          {...mergeProps(buttonProps, triggerProps)}
        >
          Open Popover
        </button>
        {animated ? (
          <CSSTransition
            visible={state.isOpen}
            childrenRef={overlayRef}
            name="nextui-popover-content"
            enterTime={60}
            leaveTime={60}
            clearTime={300}
            onExited={handleExited}
            onEntered={handleEntered}
          >
            {renderChildren}
          </CSSTransition>
        ) : state.isOpen ? (
          renderChildren
        ) : null}
      </>
    );
  }
);

Popover.displayName = 'NextUI.Popover';

type PopoverComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {};

Popover.toString = () => '.nextui-popover';

export default withDefaults(Popover, defaultProps) as PopoverComponent<
  HTMLDivElement,
  PopoverProps
>;
