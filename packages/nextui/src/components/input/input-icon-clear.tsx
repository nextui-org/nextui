import React, { useMemo } from 'react';
import useTheme from '../../hooks/use-theme';

interface Props {
  visible: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  heightRatio?: string | undefined;
  disabled?: boolean;
}

const InputIconClear: React.FC<Props> = ({
  onClick,
  heightRatio,
  disabled,
  visible,
}) => {
  const theme = useTheme();
  const width = useMemo(() => {
    return heightRatio ? `calc(10.66px * ${heightRatio})` : '18px';
  }, [heightRatio]);
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onClick && onClick(event);
  };
  return (
    <div
      onClick={clickHandler}
      className={`clear-icon ${visible ? 'visible' : ''}`}
    >
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>

      <style jsx>{`
        .clear-icon {
          padding: 0 ${theme.layout.gapHalf};
          margin: 0;
          display: inline-flex;
          align-items: center;
          height: 100%;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-sizing: border-box;
          transition: color 150ms ease 0s;
          color: ${theme.palette.accents_3};
          visibility: hidden;
          opacity: 0;
        }
        .visible {
          visibility: visible;
          opacity: 1;
        }
        .clear-icon:hover {
          color: ${disabled
            ? theme.palette.accents_3
            : theme.palette.foreground};
        }
        svg {
          color: currentColor;
          width: ${width};
          height: ${width};
        }
      `}</style>
    </div>
  );
};

const MemoInputIconClear = React.memo(InputIconClear);

export default MemoInputIconClear;
