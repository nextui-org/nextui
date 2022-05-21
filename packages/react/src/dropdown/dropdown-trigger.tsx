import React, { useRef, RefAttributes, PropsWithoutRef } from 'react';
import { useMenuTriggerState } from '@react-stately/menu';
import { MenuTriggerType } from '@react-types/menu';
import { useMenuTrigger } from '@react-aria/menu';
import Popover, { PopoverProps } from '../popover';
import { DropdownContext as MenuContext } from './dropdown-context';
import withDefaults from '../utils/with-defaults';
import { useDOMRef } from '../utils/dom';

interface Props extends PopoverProps {
  /**
   * How the menu is triggered.
   * @default 'press'
   */
  trigger?: MenuTriggerType;
  /**
   * Whether the Menu closes when a selection is made.
   * @default true
   */
  closeOnSelect?: boolean;
}

const defaultProps = {};

export type DropdownTriggerProps = Props & typeof defaultProps;

const DropdownTrigger = React.forwardRef(
  (props: DropdownTriggerProps, ref: React.Ref<HTMLElement | null>) => {
    const menuPopoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const domRef = useDOMRef(ref);
    const menuTriggerRef = domRef || triggerRef;
    const menuRef = useRef<HTMLUListElement>(null);

    const {
      children,
      shouldFlip = true,
      placement = 'bottom',
      closeOnSelect,
      trigger = 'press'
    } = props;

    const [menuTrigger, menu] = React.Children.toArray(children);
    const state = useMenuTriggerState(props);

    const { menuTriggerProps, menuProps } = useMenuTrigger(
      { trigger },
      state,
      menuTriggerRef
    );

    const menuContext = {
      ...menuProps,
      ref: menuRef,
      onClose: state.close,
      closeOnSelect,
      autoFocus: state.focusStrategy || true
    };

    return (
      <Popover
        ref={menuPopoverRef}
        triggerRef={menuTriggerRef}
        scrollRef={menuRef}
        shouldFlip={shouldFlip}
        isOpen={state.isOpen}
        placement={placement}
        onClose={state.close}
      >
        <Popover.Trigger {...menuTriggerProps}>{menuTrigger}</Popover.Trigger>
        <Popover.Content>
          <MenuContext.Provider value={menuContext}>
            {menu}
          </MenuContext.Provider>
        </Popover.Content>
      </Popover>
    );
  }
);

DropdownTrigger.displayName = 'NextUI - DropdownTrigger';

type DropdownTriggerComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {};

DropdownTrigger.toString = () => '.nextui-DropdownTrigger';

export default withDefaults(
  DropdownTrigger,
  defaultProps
) as DropdownTriggerComponent<HTMLElement, DropdownTriggerProps>;
