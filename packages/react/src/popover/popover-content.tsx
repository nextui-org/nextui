import React, {
  RefAttributes,
  ReactNode,
  RefObject,
  PropsWithoutRef
} from 'react';
import { useModal, useOverlay, DismissButton } from '@react-aria/overlays';
import { CSS } from '../theme/stitches.config';
import { useDialog } from '@react-aria/dialog';
import { mergeProps } from '@react-aria/utils';
import withDefaults from '../utils/with-defaults';
import { StyledPopoverContent } from './popover.styles';

interface Props {
  children: ReactNode;
  open?: boolean;
  animated?: boolean;
  dismissable?: boolean;
  nonModal?: boolean;
  onClose?: () => void;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  dimissable: true,
  animated: true
};

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;

export type PopoverContentProps = Props & NativeAttrs & { css?: CSS };

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
    const { dialogProps } = useDialog(
      {
        role: 'dialog'
      },
      ref
    );

    return (
      <StyledPopoverContent
        ref={ref}
        {...mergeProps(overlayProps, dialogProps, modalProps, otherProps)}
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </StyledPopoverContent>
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
