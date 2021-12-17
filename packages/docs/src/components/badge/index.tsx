import React from 'react';
import withDefaults from '@utils/with-defaults';
import { StyledBadge, BadgeVariantsProps } from './badge.styles';

interface Props {
  label: string;
}

const defaultProps = {
  label: 'Badge'
};

export type BadgeProps = Props & typeof defaultProps & BadgeVariantsProps;

const Badge: React.FC<BadgeProps> = ({ label, ...props }) => {
  return <StyledBadge {...props}>{label}</StyledBadge>;
};

export default withDefaults(Badge, defaultProps);
