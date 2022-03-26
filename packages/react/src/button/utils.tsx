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

export const getCssColors = (props: React.PropsWithChildren<ButtonProps>) => {
  if (!props.disabled) return {};
  const defaultColors = {
    bg: '$accents2',
    color: '$accents4'
  };
  if (!props.bordered && !props.flat && !props.ghost && !props.light) {
    return defaultColors;
  }
  if (props.color === 'gradient' && (props.bordered || props.ghost)) {
    return {
      color: '$accents4',
      backgroundImage:
        'linear-gradient($background, $background), linear-gradient($accents2, $accents2)'
    };
  }
  if (props.bordered) {
    return {
      ...defaultColors,
      bg: 'transparent',
      borderColor: '$accents2'
    };
  }
  if (props.ghost || props.light) {
    return {
      ...defaultColors,
      bg: 'transparent'
    };
  }
  if (props.flat) {
    return {
      ...defaultColors,
      bg: '$accents1'
    };
  }

  return {};
};
