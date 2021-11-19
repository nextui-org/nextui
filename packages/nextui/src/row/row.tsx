import React from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import { Justify, AlignItems, Wrap } from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import clsx from '../utils/clsx';

interface Props extends DefaultProps {
  gap?: number;
  fluid?: boolean;
  wrap?: Wrap;
  justify?: Justify;
  align?: AlignItems;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const defaultProps = {
  gap: 0,
  fluid: true,
  wrap: 'nowrap' as Wrap,
  justify: 'flex-start' as Justify,
  align: 'flex-start' as AlignItems,
  as: 'div' as keyof JSX.IntrinsicElements,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type RowProps = Props & typeof defaultProps & NativeAttrs;
const preClass = 'nextui-row';

const Row: React.FC<React.PropsWithChildren<RowProps>> = ({
  children,
  as,
  gap,
  fluid,
  justify,
  align,
  wrap,
  className,
  ...props
}) => {
  const Component = as;
  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

  return (
    <Component
      className={clsx(preClass, { [`${preClass}-fluid`]: fluid }, className)}
      {...props}
    >
      {children}
      <style jsx>{`
        .${preClass} {
          display: flex;
          position: relative;
          box-sizing: border-box;
          flex-wrap: ${wrap};
          margin-left: calc(${gap} * ${theme.spacing.lg} / 2);
          margin-right: calc(${gap} * ${theme.spacing.lg} / 2);
          justify-content: ${justify};
          align-items: ${align};
          --nextui-row-gap: calc(${gap} * ${theme.spacing.lg});
          ${stringCss};
        }
        .${preClass}-fluid {
          width: 100%;
        }
      `}</style>
    </Component>
  );
};

const MemoRow = React.memo(Row);

export default withDefaults(MemoRow, defaultProps);
