import React, { ReactNode } from 'react';
import { Section } from '@react-stately/collections';
import DropdownItemBase from './base/dropdown-item-base';
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
        {...context.popoverProps}
        triggerRef={context.menuTriggerRef}
        scrollRef={context.menuRef}
        isOpen={context.state.isOpen}
        onClose={context.state.close}
        disableAnimation={context.disableAnimation}
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
  Item: typeof DropdownItemBase;
  Section: typeof Section;
};

Dropdown.toString = () => '.nextui-dropdown';

export default Dropdown as DropdownComponent<DropdownProps>;
