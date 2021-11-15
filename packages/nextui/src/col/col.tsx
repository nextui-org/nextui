import React from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';

interface Props extends DefaultProps {
  span?: number;
  offset?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const defaultProps = {
  span: 12,
  offset: 0,
  as: 'div' as keyof JSX.IntrinsicElements,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ColProps = Props & typeof defaultProps & NativeAttrs;

const Col: React.FC<React.PropsWithChildren<ColProps>> = ({
  as,
  children,
  span,
  offset,
  className,
  style,
  ...props
}) => {
  const Component = as;

  const theme = useTheme();
  const spacingStyles = getSpacingsStyles(theme, props);

  return (
    <Component
      className={`nextui-col ${className}`}
      style={{ ...style, ...spacingStyles }}
      {...props}
    >
      {children}
      <style jsx>{`
        .nextui-col {
          float: left;
          box-sizing: border-box;
          padding-left: calc(var(--nextui-row-gap) / 2);
          padding-right: calc(var(--nextui-row-gap) / 2);
          width: ${(100 / 12) * span}%;
          margin-left: ${(100 / 12) * offset}%;
        }
      `}</style>
    </Component>
  );
};

const MemoCol = React.memo(Col);

export default withDefaults(MemoCol, defaultProps);
