import React, { ReactNode } from 'react';
import { Item, Section } from '@react-stately/collections';
import Popover from '../popover';
import { DropdownProvider } from './dropdown-context';
import { DropdownTrigger } from './dropdown-trigger';
import DropdownMenu from './dropdown-menu';
import { useDropdown, UseDropdownProps } from './use-dropdown';
import { __DEV__ } from '../utils/assertion';

interface Props extends UseDropdownProps {
  /**
   * The content of the dropdown. It is usually the `Dropdown.Trigger`,
   * and `Dropdown.Menu`
   */
  children: ReactNode | undefined;
}

export type DropdownProps = Props;

const Dropdown = (props: DropdownProps) => {
  const { children, ...otherProps } = props;

  const context = useDropdown(otherProps);

  const [menuTrigger, menu] = React.Children.toArray(children);

  return (
    <DropdownProvider value={context}>
      <Popover
        ref={context.menuPopoverRef}
        triggerRef={context.menuTriggerRef}
        scrollRef={context.menuRef}
        shouldFlip={context.shouldFlip}
        isOpen={context.state.isOpen}
        placement={context.placement}
        onClose={context.state.close}
      >
        {menuTrigger}
        <Popover.Content>{menu}</Popover.Content>
      </Popover>
    </DropdownProvider>
  );
};

if (__DEV__) {
  Dropdown.displayName = 'NextUI.Dropdown';
}

type DropdownComponent<P = {}> = React.FC<P> & {
  Trigger: typeof DropdownTrigger;
  Menu: typeof DropdownMenu;
  Item: typeof Item;
  Section: typeof Section;
};

Dropdown.toString = () => '.nextui-dropdown';

export default Dropdown as DropdownComponent<DropdownProps>;
