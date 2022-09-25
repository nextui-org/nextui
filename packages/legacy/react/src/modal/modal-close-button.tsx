import React from "react";

import ClearIcon from "../utils/clear-icon";
import {CSS} from "../theme/stitches.config";

import {StyledModalCloseButton, ModalCloseButtonVariantsProps} from "./modal.styles";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;

export type ModalCloseButtonProps = Props &
  NativeAttrs &
  ModalCloseButtonVariantsProps & {css?: CSS};

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({onClick, ...props}) => {
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onClick && onClick(event);
  };

  return (
    <StyledModalCloseButton
      aria-label="Close"
      className="nextui-modal-close-icon"
      type="button"
      onClick={clickHandler}
      {...props}
    >
      <ClearIcon
        plain
        aria-hidden={true}
        className="nextui-modal-close-icon-svg"
        fill="currentColor"
        size={18}
      />
    </StyledModalCloseButton>
  );
};

ModalCloseButton.toString = () => ".nextui-modal-close-icon";

const MemoModalCloseButton = React.memo(ModalCloseButton);

export default MemoModalCloseButton;
