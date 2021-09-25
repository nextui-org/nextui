import React, { useMemo } from 'react';
import useTheme from '../../hooks/use-theme';
import { SimpleColors } from '../../utils/prop-types';
import clsx from '../../utils/clsx';
import { addColorAlpha } from '../../utils/color';

export interface InputLabelProps {
  fontSize: string;
  status?: SimpleColors;
  bgColor?: string;
  color?: string;
  radius?: string;
  isRight?: boolean;
  bordered?: boolean;
  underlined?: boolean;
  borderWeight?: string;
}

const InputLabel: React.FC<React.PropsWithChildren<InputLabelProps>> = ({
  children,
  isRight,
  fontSize,
  bgColor,
  radius,
  status,
  color,
  bordered,
  underlined,
  borderWeight,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.type === 'dark';
  const inputBgColor = useMemo(() => {
    return underlined
      ? 'transparent'
      : status === 'default' && !bordered
      ? isDark
        ? theme.palette.accents_3
        : addColorAlpha(theme.palette.accents_3, 0.3)
      : bgColor || theme.palette.accents_2;
  }, [isDark, status, underlined, bgColor, bordered]);
  return (
    <span
      className={clsx('input-label', {
        right: isRight,
        left: !isRight,
        underlined,
        bordered,
      })}
      {...props}
    >
      {children}
      <style jsx>{`
        .input-label {
          position: relative;
          display: inline-flex;
          width: initial;
          height: 100%;
          font-weight: 500;
          align-items: center;
          pointer-events: none;
          margin: 0;
          background: ${inputBgColor};
          padding: 0 ${theme.layout.gapHalf};
          color: ${color || theme.palette.accents_4};
          font-size: ${fontSize};
          line-height: 1;
        }
        .right {
          border-top-right-radius: ${radius};
          border-bottom-right-radius: ${radius};
        }
        .left {
          border-top-left-radius: ${radius};
          border-bottom-left-radius: ${radius};
        }
        .underlined.left:after,
        .underlined.right:before {
          position: absolute;
          content: '';
          height: 70%;
          top: 15%;
          bottom: 0;
          width: calc(${borderWeight} / 2);
          box-shadow: 0 2px 4px 0px rgb(0 0 0 / 8%);
          background: ${color || theme.palette.accents_4};
        }
        .underlined.left:after {
          right: 0;
        }
        .underlined.right:before {
          left: 0;
        }
        .bordered:after,
        .bordered:before {
          display: none;
        }
      `}</style>
    </span>
  );
};

const MemoInputLabel = React.memo(InputLabel);

export default MemoInputLabel;
