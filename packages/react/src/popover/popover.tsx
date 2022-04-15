import React, {
  useRef,
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
import withDefaults from '../utils/with-defaults';
import { useButton } from '@react-aria/button';
import { useDOMRef } from '../utils/dom';
import { getAriaPlacement, PopoverPlacement } from './utils';
import PopoverContent from './popover-content';
import { mergeProps } from '@react-aria/utils';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  open?: boolean;
  initialOpen?: boolean;
  placement?: PopoverPlacement;
  arrowProps?: HTMLAttributes<HTMLElement>;
  hideArrow?: boolean;
  nonModal?: boolean;
  dismissable?: boolean;
  offset?: number;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

const defaultProps = {
  placement: 'bottom',
  dismissable: true,
  offset: 12,
  nonModal: true
};

export type PopoverProps = Props;

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
      dismissable
    } = props;

    const state = useOverlayTriggerState({
      isOpen: open,
      defaultOpen: initialOpen,
      onOpenChange
    });

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

    return (
      <>
        <button
          ref={overlayTriggerRef}
          {...mergeProps(buttonProps, triggerProps)}
        >
          Open Popover
        </button>
        {state.isOpen && (
          <OverlayContainer>
            <PopoverContent
              ref={overlayRef}
              open={state.isOpen}
              dismissable={dismissable}
              onClose={state.close}
              nonModal={nonModal}
              {...mergeProps(overlayProps, positionProps)}
            >
              {children}
            </PopoverContent>
          </OverlayContainer>
        )}
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
