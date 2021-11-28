import React from 'react';
import { StyledCardBody, CardBodyVariantsProps } from './card.styles';

const CardBody: React.FC<React.PropsWithChildren<CardBodyVariantsProps>> = ({
  children,
  ...props
}) => {
  return <StyledCardBody {...props}>{children}</StyledCardBody>;
};

export default CardBody;
