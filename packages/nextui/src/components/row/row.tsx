import React from 'react';
import withDefaults from '../../utils/with-defaults';
import useTheme from '../../hooks/use-theme';
import { Justify, AlignItems } from '../../utils/prop-types';

interface Props {
  gap?: number;
  flexWrap?: boolean;
  fluid?: boolean;
  justify?: Justify;
  align?: AlignItems;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const defaultProps = {
  gap: 0,
  flexWrap: false,
  fluid: true,
  justify: 'flex-start' as Justify,
  align: 'flex-start' as AlignItems,
  as: 'div' as keyof JSX.IntrinsicElements,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type RowProps = Props & typeof defaultProps & NativeAttrs;

const Row: React.FC<React.PropsWithChildren<RowProps>> = ({
  children,
  as,
  gap,
  fluid,
  justify,
  align,
  flexWrap,
  className,
  ...props
}) => {
  const Component = as;
  const theme = useTheme();

  return (
    <Component className={`row ${className} ${fluid && 'fluid'}`} {...props}>
      {children}
      <style jsx>{`
        .row {
          display: flex;
          position: relative;
          box-sizing: border-box;
          flex-wrap: ${flexWrap ? 'wrap' : 'nowrap'};
          margin-left: calc(${gap} * ${theme.layout.gap} / 2);
          margin-right: calc(${gap} * ${theme.layout.gap} / 2);
          --row-gap: calc(${gap} * ${theme.layout.gap});
          justify-content: ${justify};
          align-items: ${align};
        }
        .fluid {
          width: 100%;
        }
      `}</style>
    </Component>
  );
};

const MemoRow = React.memo(Row);

export default withDefaults(MemoRow, defaultProps);
