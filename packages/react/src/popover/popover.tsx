import React, { ReactNode } from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { __DEV__ } from '../utils/assertion';
import withDefaults from '../utils/with-defaults';
import { pickChild } from '../utils/collections';
import { PopoverContent } from './popover-content';
import { usePopover, UsePopoverProps } from './use-popover';
import { PopoverProvider } from './popover-context';
import { PopoverTrigger } from './popover-trigger';

interface PopoverProps extends UsePopoverProps {
  /**
   * The content of the popover. It is usually the `Popover.Trigger`,
   * and `Popover.Content`
   */
  children?: ReactNode | undefined;
}

const defaultProps = {
  animated: true
};

const Popover = (props: PopoverProps) => {
  const { children, ...otherProps } = props;
  const context = usePopover(otherProps);

  const [withoutTrigger, triggerChildren] = pickChild(children, PopoverTrigger);
  const [, contentChildren] = pickChild(withoutTrigger, PopoverContent);

  return (
    <PopoverProvider value={context}>
      {triggerChildren}
      <OverlayContainer>
        <FocusScope restoreFocus>{contentChildren}</FocusScope>
      </OverlayContainer>
    </PopoverProvider>
  );
};

type PopoverComponent<P = {}> = React.FC<P> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
};

if (__DEV__) {
  Popover.displayName = 'NextUI.Popover';
}

Popover.toString = () => '.nextui-popover';

export default withDefaults(
  Popover,
  defaultProps
) as PopoverComponent<PopoverProps>;
