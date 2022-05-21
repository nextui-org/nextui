import React from 'react';
import Popover from '../popover';
import { useDropdownContext } from './dropdown-context';
import { __DEV__ } from '../utils/assertion';

/**
 * DropdownTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
export const DropdownTrigger = (props: React.PropsWithChildren<{}>) => {
  const { children, ...otherProps } = props;
  const { getMenuTriggerProps } = useDropdownContext();

  return (
    <Popover.Trigger {...getMenuTriggerProps(otherProps)}>
      {children}
    </Popover.Trigger>
  );
};

if (__DEV__) {
  DropdownTrigger.displayName = 'NextUI - DropdownTrigger';
}

DropdownTrigger.toString = () => '.nextui-dropdown-trigger';
