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
import { DOMRef } from '@react-types/shared';
import { useOverlayTriggerState } from '@react-stately/overlays';
import {
  OverlayContainer,
  useOverlayPosition,
  useOverlayTrigger
} from '@react-aria/overlays';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';
import { CSS } from '../theme/stitches.config';
import CSSTransition from '../utils/css-transition';
import { useDOMRef } from '../utils/dom';
import { getAriaPlacement, PopoverPlacement } from './utils';
import withDefaults from '../utils/with-defaults';
import PopoverContent from './popover-content';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'css'> {
  children: ReactNode;
  open?: boolean;
  initialOpen?: boolean;
  placement?: PopoverPlacement;
  arrowProps?: HTMLAttributes<HTMLElement>;
  hideArrow?: boolean;
  nonModal?: boolean;
  animated?: boolean;
  dismissable?: boolean;
  offset?: number;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

const defaultProps = {
  placement: 'bottom',
  dismissable: true,
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
      css
    } = props;

    const state = useOverlayTriggerState({
      isOpen: open,
      defaultOpen: initialOpen,
      onOpenChange
    });

    const [exited, setExited] = useState(!state.isOpen);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const domRef = useDOMRef(ref as DOMRef<HTMLButtonElement>);

    const overlayTriggerRef = domRef || triggerRef;
    const overlayRef = useRef<HTMLElement>(null);

    const { triggerProps, overlayProps } = useOverlayTrigger(
      { type: 'dialog' },
      state,
      overlayTriggerRef
    );

    const { overlayProps: positionProps } = useOverlayPosition({
      targetRef: overlayTriggerRef,
      overlayRef,
      placement: getAriaPlacement(placement),
      offset,
      isOpen: state.isOpen
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
        <PopoverContent
          ref={overlayRef}
          open={state.isOpen}
          dismissable={dismissable}
          nonModal={nonModal}
          onClose={state.close}
          data-state={getState}
          data-side={placement}
          {...mergeProps(overlayProps, positionProps)}
        >
          {children}
        </PopoverContent>
      );
    }, [
      exited,
      dismissable,
      nonModal,
      state,
      overlayProps,
      positionProps,
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
          <OverlayContainer>
            <CSSTransition
              visible={state.isOpen}
              name="nextui-popover-content"
              enterTime={200}
              leaveTime={220}
              clearTime={300}
              onExited={handleExited}
              onEntered={handleEntered}
            >
              {renderChildren}
            </CSSTransition>
          </OverlayContainer>
        ) : state.isOpen ? (
          renderChildren
        ) : null}
        {/* {state.isOpen && (
          <OverlayContainer>
            <PopoverContent
              ref={overlayRef}
              open={state.isOpen}
              dismissable={dismissable}
              nonModal={nonModal}
              onClose={state.close}
              data-state={getState}
              data-side={placement}
              {...mergeProps(overlayProps, positionProps)}
            >
              {children}
            </PopoverContent>
          </OverlayContainer>
        )} */}
      </>
    );
  }
);

Popover.displayName = 'NextUI - Popover';

type PopoverComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {};

Popover.toString = () => '.nextui-popover';

export default withDefaults(Popover, defaultProps) as PopoverComponent<
  HTMLDivElement,
  PopoverProps
>;
