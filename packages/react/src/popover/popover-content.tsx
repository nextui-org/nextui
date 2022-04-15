import React, {
  RefAttributes,
  ReactNode,
  RefObject,
  PropsWithoutRef
} from 'react';
import { useModal, useOverlay, DismissButton } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { useDialog } from '@react-aria/dialog';
import withDefaults from '../utils/with-defaults';
import { mergeProps } from '@react-aria/utils';

interface Props {
  children: ReactNode;
  open?: boolean;
  dismissable?: boolean;
  nonModal?: boolean;
  onClose?: () => void;
}

const defaultProps = {
  dimissable: true
};

export type PopoverContentProps = Props;

const PopoverContent = React.forwardRef(
  (props: PopoverContentProps, ref: RefObject<HTMLDivElement>) => {
    const { children, open, onClose, dismissable, nonModal, ...otherProps } =
      props;
    const { overlayProps } = useOverlay(
      {
        onClose,
        isOpen: open,
        isDismissable: dismissable && open
      },
      ref
    );
    const { modalProps } = useModal({
      isDisabled: nonModal
    });
    const { dialogProps } = useDialog({}, ref);

    return (
      <FocusScope restoreFocus>
        <div
          ref={ref}
          style={{
            background: 'blue',
            color: 'black',
            padding: 30
          }}
          {...mergeProps(overlayProps, dialogProps, modalProps, otherProps)}
        >
          {children}
          <DismissButton onDismiss={onClose} />
        </div>
      </FocusScope>
    );
  }
);

PopoverContent.displayName = 'NextUI - Popover Content';

type PopoverContentComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {};

PopoverContent.toString = () => '.nextui-popover-content';

export default withDefaults(
  PopoverContent,
  defaultProps
) as PopoverContentComponent<HTMLElement, PopoverContentProps>;
