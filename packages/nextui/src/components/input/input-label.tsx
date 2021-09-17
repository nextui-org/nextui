import React from 'react';
import useTheme from '../../hooks/use-theme';

export interface InputLabelProps {
  fontSize: string;
  radius?: string;
  isRight?: boolean;
  borderWeight?: string;
}

const InputLabel: React.FC<React.PropsWithChildren<InputLabelProps>> = ({
  children,
  isRight,
  fontSize,
  radius,
  borderWeight,
}) => {
  const theme = useTheme();
  return (
    <span className={`input-label ${isRight ? 'right' : ''}`}>
      {children}
      <style jsx>{`
        span {
          display: inline-flex;
          width: initial;
          height: 100%;
          align-items: center;
          pointer-events: none;
          margin: 0;
          padding: 0 ${theme.layout.gapHalf};
          color: ${theme.palette.accents_4};
          background-color: ${theme.palette.accents_2};
          border-top-left-radius: ${radius};
          border-bottom-left-radius: ${radius};
          border-top: ${borderWeight} solid ${theme.palette.border};
          border-left: ${borderWeight} solid ${theme.palette.border};
          border-bottom: ${borderWeight} solid ${theme.palette.border};
          font-size: ${fontSize};
          line-height: 1;
        }
        span.right {
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
