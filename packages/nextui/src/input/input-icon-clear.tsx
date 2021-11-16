import React, { useMemo } from 'react';
import clsx from '../utils/clsx';
import useTheme from '../use-theme';
import ClearIcon from '../utils/clear-icon';
import { SimpleColors } from '../utils/prop-types';
import { getNormalColor } from '../utils/color';

interface Props {
  visible: boolean;
  hasContentRight?: boolean;
  underlined?: boolean;
  status?: SimpleColors;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  heightRatio?: string | undefined;
  disabled?: boolean;
}
const preClass = 'nextui-input-clear-icon';

const InputIconClear: React.FC<Props> = ({
  onClick,
  heightRatio,
  status,
  disabled,
  visible,
  underlined,
  hasContentRight,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.type === 'dark';
  const width = useMemo(() => {
    return heightRatio ? `calc(10.66px * ${heightRatio})` : '18px';
  }, [heightRatio]);

  const color = useMemo(
    () =>
      status === 'default'
        ? isDark
          ? theme.palette.accents_6
          : theme.palette.accents_3
        : getNormalColor(status, theme.palette),
    [status, isDark, theme.palette]
  );

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onClick && onClick(event);
  };

  return (
    <button
      onClick={clickHandler}
      className={clsx(preClass, {
        [`${preClass}-visible`]: visible,
        [`${preClass}-underlined`]: underlined,
        [`${preClass}-content-right`]: hasContentRight
      })}
      {...props}
    >
      <ClearIcon fill="currentColor" />
      <style jsx>{`
        .${preClass} {
          position: absolute;
          right: 0;
          margin: 0;
          display: inline-flex;
          align-items: center;
          border: none;
          background-color: transparent;
          height: auto;
          padding: 0 ${underlined ? '2px' : theme.spacing.sm};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-sizing: border-box;
          transition: color 250ms ease 0s, transform 250ms ease 0s;
          color: ${color};
          visibility: hidden;
          transform: translateX(20%);
          opacity: 0;
        }
        .${preClass}:hover {
          color: ${disabled
            ? theme.palette.accents_3
            : theme.palette.foreground};
        }
        .${preClass} :global(svg) {
          color: currentColor;
          width: ${width};
          height: ${width};
        }
        .${preClass}-content-right {
          padding: 0;
          position: relative;
          transform: translateX(30%);
        }
        .${preClass}-visible {
          visibility: visible;
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>
    </button>
  );
};

const MemoInputIconClear = React.memo(InputIconClear);

export default MemoInputIconClear;
