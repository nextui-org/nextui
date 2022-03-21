import React from 'react';
import withDefaults from '../utils/with-defaults';
import { getMargin } from '../utils/dimensions';
import { CSS } from '../theme/stitches.config';
import { StyledSpacer, SpacerVariantsProps } from './spacer.styles';

interface Props {
  x?: number;
  y?: number;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  x: 1,
  y: 1
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type SpacerProps = Props &
  typeof defaultProps &
  NativeAttrs &
  SpacerVariantsProps;

const Spacer: React.FC<SpacerProps> = ({ x, y, inline, css, ...props }) => {
  const marginLeft = getMargin(x);
  const marginTop = getMargin(y);
  return (
    <StyledSpacer
      css={{ marginLeft, marginTop, ...(css as any) }}
      {...props}
    ></StyledSpacer>
  );
};

Spacer.toString = () => '.nextui-spacer';

const MemoSpacer = React.memo(Spacer);

export default withDefaults(MemoSpacer, defaultProps);
