import React from 'react';
import withDefaults from '../utils/with-defaults';
import { StyledCardFooter, CardFooterVariantsProps } from './card.styles';

interface Props {
  blur?: boolean;
}

const defaultProps = {
  blur: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;
export type CardFooterProps = Props & CardFooterVariantsProps & NativeAttrs;

const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = ({
  children,
  ...props
}) => {
  return <StyledCardFooter {...props}>{children}</StyledCardFooter>;
};

const MemoCardFooter = React.memo(CardFooter);

export default withDefaults(MemoCardFooter, defaultProps);
