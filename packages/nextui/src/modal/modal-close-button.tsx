import React from 'react';
import clsx from '../utils/clsx';
import useTheme from '../use-theme';
import ClearIcon from '../utils/clear-icon';
import { getFocusStyles } from '../utils/styles';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ModalCloseButton: React.FC<Props> = ({ onClick, disabled, ...props }) => {
  const theme = useTheme();

  const { styles, className } = getFocusStyles(theme);

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onClick && onClick(event);
  };

  return (
    <button
      type="button"
      onClick={clickHandler}
      className={clsx('close-icon', className)}
      aria-label="Close"
      {...props}
    >
      <ClearIcon plain size={18} fill="currentColor" aria-hidden={true} />
      <style jsx>{`
        .close-icon {
          position: absolute;
          background: transparent;
          border: none;
          z-index: 1;
          top: calc(${theme.spacing.sm} * 0.5);
          right: calc(calc(${theme.spacing.sm} * 0.5) * 0.5);
          margin: 0;
          display: inline-flex;
          align-items: center;
          height: auto;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-sizing: border-box;
          transition: all 250ms ease 0s;
          padding: calc(${theme.spacing.sm} * 0.5);
          color: ${theme.palette.accents_4};
          border-radius: 9px;
        }
        .close-icon:hover {
          opacity: 0.8;
        }
        .close-icon :global(svg) {
          color: currentColor;
        }
      `}</style>
      {styles}
    </button>
  );
};

const MemoModalCloseButton = React.memo(ModalCloseButton);

export default MemoModalCloseButton;
