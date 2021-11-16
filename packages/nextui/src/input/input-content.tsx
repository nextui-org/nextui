import React, { useMemo } from 'react';
import { ContentPosition, SimpleColors } from '../utils/prop-types';
import useTheme from '../use-theme';
import { getNormalColor } from '../utils/color';
import clsx from '../utils/clsx';

export interface InputContentProps {
  content: React.ReactNode;
  ratio: string;
  clickable: boolean;
  onClick: (key: ContentPosition, e: React.MouseEvent<HTMLDivElement>) => void;
  applyStyles?: boolean;
  isLeft?: boolean;
  hover?: boolean;
  status?: SimpleColors;
}

const InputContent: React.FC<InputContentProps> = ({
  content,
  ratio,
  status,
  isLeft,
  clickable,
  applyStyles = true,
  onClick,
  ...props
}) => {
  const theme = useTheme();

  const width = useMemo(() => {
    return `calc(${ratio} * ${theme.spacing.lg} * .42)`;
  }, [theme.spacing.lg, ratio]);

  const padding = useMemo(() => {
    return `calc(${ratio} * ${theme.spacing.lg} * .3)`;
  }, [theme.spacing.lg, ratio]);

  return (
    <span
      className={clsx({ 'nextui-input-content': applyStyles })}
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        onClick(isLeft ? 'left' : 'right', e)
      }
      {...props}
    >
      {content}
      <style jsx>{`
        .nextui-input-content {
          box-sizing: content-box;
          display: flex;
          width: ${width};
          height: 100%;
          align-items: center;
          vertical-align: center;
          margin: 0;
          padding: 0 ${padding};
          color: ${status === 'default'
            ? theme.palette.text
            : getNormalColor(status, theme.palette)};
          line-height: 1;
          position: relative;
          cursor: ${clickable ? 'pointer' : 'default'};
          pointer-events: ${clickable ? 'auto' : 'none'};
        }
      `}</style>
    </span>
  );
};

const MemoContentIcon = React.memo(InputContent);

export default MemoContentIcon;
