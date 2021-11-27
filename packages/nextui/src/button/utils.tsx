import React from 'react';
import { ButtonProps } from './button';
import { ButtonGroupConfig } from './button-group-context';

export const filterPropsWithGroup = (
  props: React.PropsWithChildren<ButtonProps>,
  config: ButtonGroupConfig
): ButtonProps => {
  if (!config.isButtonGroup) return props;
  return {
    ...props,
    auto: true,
    shadow: false,
    bordered: config.bordered ?? props.bordered,
    borderWeight: config.borderWeight ?? props.borderWeight,
    ghost: config.ghost ?? props.ghost,
    ripple: config.ripple ?? props.ripple,
    flat: config.flat ?? props.flat,
    animated: config.animated ?? props.animated,
    rounded: config.rounded ?? props.rounded,
    light: config.light ?? props.light,
    size: config.size ?? props.size,
    color: config.color ?? props.color,
    disabled: config.disabled ?? props.disabled
  };
};
