import * as React from 'react';
import { usePopoverContext } from './popover-context';
import { __DEV__ } from '../utils/assertion';

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger = (props: React.PropsWithChildren<{}>) => {
  // enforce a single child
  const child: any = React.Children.only(props.children);
  const { getTriggerProps } = usePopoverContext();
  return React.cloneElement(child, getTriggerProps(child.props, child.ref));
};

if (__DEV__) {
  PopoverTrigger.displayName = 'NextUI.PopoverTrigger';
}

PopoverTrigger.toString = () => '.nextui-popover-trigger';
