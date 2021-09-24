import React from 'react';
import useTheme from '../../hooks/use-theme';
import clsx from '../../utils/clsx';

export interface InputLabelProps {
  fontSize: string;
  color?: string;
  bgColor?: string;
  radius?: string;
  isRight?: boolean;
  bordered?: boolean;
  borderWeight?: string;
}

const InputLabel: React.FC<React.PropsWithChildren<InputLabelProps>> = ({
  children,
  isRight,
  fontSize,
  radius,
  color,
  bgColor,
  bordered,
  borderWeight,
}) => {
  const theme = useTheme();
  return (
    <span
      className={clsx('input-label', {
        right: isRight,
        left: !isRight,
        bordered,
      })}
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
          padding: 0 ${theme.layout.gapHalf};
          color: ${color || theme.palette.accents_4};
          background-color: ${bordered
            ? 'transparent'
            : bgColor || theme.palette.accents_2};
          border-top-left-radius: ${radius};
          border-bottom-left-radius: ${radius};
          border-top: ${borderWeight} solid ${theme.palette.border};
          border-left: ${borderWeight} solid ${theme.palette.border};
          border-bottom: ${borderWeight} solid ${theme.palette.border};
          font-size: ${fontSize};
          line-height: 1;
        }
        .left:after,
        .right:before {
          position: absolute;
          content: '';
          height: 70%;
          top: 15%;
          bottom: 0;
          width: 1px;
          opacity: 0.5;
          background: ${color || theme.palette.accents_4};
        }
        .left:after {
          right: 0;
        }
        .right:before {
          left: 0;
        }
        .bordered:after,
        .bordered:before {
          display: none;
        }
        .input-label.right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: ${radius};
          border-bottom-right-radius: ${radius};
          border-left: 0;
          border-right: ${borderWeight} solid ${theme.palette.border};
        }
      `}</style>
    </span>
  );
};

const MemoInputLabel = React.memo(InputLabel);

export default MemoInputLabel;
