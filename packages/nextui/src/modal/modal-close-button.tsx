import React from 'react';
import useTheme from '../use-theme';
import ClearIcon from '../shared/clear-icon';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

const ModalCloseButton: React.FC<Props> = ({ onClick, disabled, ...props }) => {
  const theme = useTheme();

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onClick && onClick(event);
  };

  return (
    <div onClick={clickHandler} className="close-icon" {...props}>
      <ClearIcon plain size={18} fill="currentColor" />
      <style jsx>{`
        .close-icon {
          position: absolute;
          z-index: 1;
          top: ${theme.layout.gapQuarter};
          right: calc(${theme.layout.gapQuarter} * 0.5);
          margin: 0;
          display: inline-flex;
          align-items: center;
          height: auto;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-sizing: border-box;
          transition: opacity 250ms ease 0s;
          padding: ${theme.layout.gapQuarter};
          color: ${theme.palette.accents_4};
        }
        .close-icon:hover {
          opacity: 0.8;
        }
        .close-icon :global(svg) {
          color: currentColor;
        }
      `}</style>
    </div>
  );
};

const MemoModalCloseButton = React.memo(ModalCloseButton);

export default MemoModalCloseButton;
