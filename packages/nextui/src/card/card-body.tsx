import React from 'react';
import { StyledCardBody, CardBodyVariantsProps } from './card.styles';

export type CardBodyProps = CardBodyVariantsProps;

const CardBody: React.FC<React.PropsWithChildren<CardBodyProps>> = ({
  children,
  ...props
}) => {
  return <StyledCardBody {...props}>{children}</StyledCardBody>;
};

export default CardBody;
