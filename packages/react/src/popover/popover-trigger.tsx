import * as React from 'react';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';
import { usePopoverContext } from './popover-context';
import { pickChild } from '../utils/collections';
import { Button } from '../index';
import { __DEV__ } from '../utils/assertion';

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger = (props: React.PropsWithChildren<{}>) => {
  const { state, triggerRef, getTriggerProps } = usePopoverContext();
  const { children, ...otherProps } = props;

  const onPress = () => state.open();

  const { buttonProps } = useButton(
    {
      onPress,
      ...otherProps
    },
    triggerRef
  );

  // enforce a single child
  const child: any = React.Children.only(children);

  // validates if contains a NextUI Button as a child
  const [, triggerChildren] = pickChild(props.children, Button);
  const hasNextUIButton = triggerChildren?.[0] !== undefined;

  return React.cloneElement(
    child,
    getTriggerProps(
      mergeProps(
        child.props,
        hasNextUIButton ? { onPress, ...otherProps } : buttonProps
      ),
      child.ref
    )
  );
};

if (__DEV__) {
  PopoverTrigger.displayName = 'NextUI.PopoverTrigger';
}

PopoverTrigger.toString = () => '.nextui-popover-trigger';
