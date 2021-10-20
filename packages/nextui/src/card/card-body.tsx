import React from 'react';
import useTheme from '../use-theme';
import {
  AlignContent,
  AlignItems,
  Justify,
  Direction
} from '../utils/prop-types';
import withDefaults from '../utils/with-defaults';

interface Props {
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  width?: string;
  height?: string;
  className?: string;
}

const defaultProps = {
  width: '100%',
  height: 'auto',
  justify: 'inherit',
  alignItems: 'inherit',
  alignContent: 'inherit',
  direction: 'column',
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardContentProps = Props & typeof defaultProps & NativeAttrs;

const CardContent: React.FC<React.PropsWithChildren<CardContentProps>> = ({
  className,
  justify,
  alignContent,
  alignItems,
  direction,
  width,
  height,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <div className={`content ${className}`} {...props}>
      {children}
      <style jsx>{`
        .content {
          display: flex;
          flex: 1 1 auto;
          width: ${width};
          height: ${height};
          flex-direction: ${direction};
          justify-content: ${justify};
          align-items: ${alignItems};
          align-content: ${alignContent};
          padding: ${theme.layout.gapHalf} calc(${theme.layout.gap} + 0.25rem);
          overflow-y: auto;
          position: relative;
          text-align: left;
        }
        .content > :global(*:first-child) {
          margin-top: 0;
        }
        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

const MemoCardContent = React.memo(CardContent);

export default withDefaults(MemoCardContent, defaultProps);
