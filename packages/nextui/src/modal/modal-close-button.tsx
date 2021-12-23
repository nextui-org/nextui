import React from 'react';
import ClearIcon from '../utils/clear-icon';
import { CSS } from '../theme/stitches.config';
import {
  StyledModalCloseButton,
  ModalCloseButtonVariantsProps
} from './modal.styles';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;

export type ModalCloseButtonProps = Props &
  NativeAttrs &
  ModalCloseButtonVariantsProps & { css?: CSS };

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClick,
  ...props
}) => {
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onClick && onClick(event);
  };

  return (
    <StyledModalCloseButton
      type="button"
      onClick={clickHandler}
      className="nextui-modal-close-icon"
      aria-label="Close"
      {...props}
    >
      <ClearIcon
        plain
        size={18}
        className="nextui-modal-close-icon-svg"
        fill="currentColor"
        aria-hidden={true}
      />
    </StyledModalCloseButton>
  );
};

ModalCloseButton.toString = () => '.nextui-modal-close-icon';

const MemoModalCloseButton = React.memo(ModalCloseButton);

export default MemoModalCloseButton;
