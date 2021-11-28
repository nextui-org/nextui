import React from 'react';
import { StyledCardHeader, CardHeaderVariantsProps } from './card.styles';

export type CardHeaderProps = CardHeaderVariantsProps;

const CardHeader: React.FC<React.PropsWithChildren<CardHeaderProps>> = ({
  children,
  ...props
}) => {
  return <StyledCardHeader {...props}>{children}</StyledCardHeader>;
};

export default CardHeader;
