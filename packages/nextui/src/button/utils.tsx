import React from 'react';
import { ButtonProps } from '../button/button';
import { ButtonGroupConfig } from '../button/button-group-context';

export const filterPropsWithGroup = (
  props: React.PropsWithChildren<ButtonProps>,
  config: ButtonGroupConfig
): ButtonProps => {
  if (!config.isButtonGroup) return props;
  return {
    ...props,
    auto: true,
    shadow: false,
    bordered: config.bordered || props.bordered,
    ghost: config.ghost || props.ghost,
    flat: config.flat || props.flat,
    animated: config.animated || props.animated,
    rounded: config.rounded || props.rounded,
    light: config.light || props.light,
    size: config.size || props.size,
    color: config.color || props.color,
    disabled: config.disabled || props.disabled,
  };
};
