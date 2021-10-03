import React, { useMemo } from 'react';
import clsx from '../utils/clsx';
import useTheme from '../use-theme';
import ClearIcon from './clear-icon';
import { SimpleColors } from '../utils/prop-types';
import { getNormalColor } from '../utils/color';

interface Props {
  visible: boolean;
  hasContentRight?: boolean;
  status?: SimpleColors;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  heightRatio?: string | undefined;
  disabled?: boolean;
}

const InputIconClear: React.FC<Props> = ({
  onClick,
  heightRatio,
  status,
  disabled,
  visible,
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

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onClick && onClick(event);
  };

  return (
    <div
      onClick={clickHandler}
      className={clsx('clear-icon', {
        visible,
        'dark-theme': isDark,
        'has-content-right': hasContentRight,
      })}
      {...props}
    >
      <ClearIcon fill="currentColor" />
      <style jsx>{`
        .clear-icon {
          position: absolute;
          right: 0;
          margin: 0;
          display: inline-flex;
          align-items: center;
          height: auto;
          padding: 0 ${theme.layout.gapHalf};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-sizing: border-box;
          transition: color 250ms ease 0s, transform 250ms ease 0s;
          color: ${color};
          visibility: hidden;
          transform: translateX(20%);
          opacity: 0;
        }
        .has-content-right {
          padding: 0;
          position: relative;
          transform: translateX(30%);
        }
        .visible {
          visibility: visible;
          transform: translateX(0);
          opacity: 1;
        }
        .clear-icon:hover {
          color: ${disabled
            ? theme.palette.accents_3
            : theme.palette.foreground};
        }
        .clear-icon :global(svg) {
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
