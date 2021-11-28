import React from 'react';
import { StyledCardHeader, CardHeaderVariantsProps } from './card.styles';

const CardHeader: React.FC<React.PropsWithChildren<CardHeaderVariantsProps>> =
  ({ children, ...props }) => {
    return <StyledCardHeader {...props}>{children}</StyledCardHeader>;
  };

export default CardHeader;
