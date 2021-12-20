import React from 'react';
import withDefaults from '../utils/with-defaults';
import StyledCol, { ColVariantsProps } from './col.styles';
import { CSS } from '../theme/stitches.config';

interface Props {
  span?: number;
  offset?: number;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  span: 12,
  offset: 0
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ColProps = Props &
  typeof defaultProps &
  ColVariantsProps &
  NativeAttrs;

const Col: React.FC<React.PropsWithChildren<ColProps>> = ({
  children,
  span,
  offset,
  css,
  ...props
}) => {
  return (
    <StyledCol
      css={{
        width: `${(100 / 12) * span}%`,
        marginLeft: `${(100 / 12) * offset}%`,
        ...(css as any)
      }}
      {...props}
    >
      {children}
    </StyledCol>
  );
};

const MemoCol = React.memo(Col);

export default withDefaults(MemoCol, defaultProps);
