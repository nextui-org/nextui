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
  if (!props.disabled) {
    if (
      props.auto &&
      props.color === 'gradient' &&
      (props.bordered || props.ghost)
    ) {
      return {
        px: '$$buttonBorderWeight',
        py: '$$buttonBorderWeight'
      };
    }
    return {};
  }
  const defaultDisabledCss = {
    bg: '$accents0',
    color: '$accents5',
    transform: 'none',
    boxShadow: 'none',
    pe: 'none'
  };

  if (!props.bordered && !props.flat && !props.ghost && !props.light) {
    return defaultDisabledCss;
  }
  if (props.color === 'gradient' && (props.bordered || props.ghost)) {
    return {
      color: '$accents4',
      backgroundImage:
        'linear-gradient($background, $background), linear-gradient($accents2, $accents2)',
      transform: 'none',
      boxShadow: 'none',
      pe: 'none',
      pl: '$$buttonBorderWeight',
      pr: '$$buttonBorderWeight'
    };
  }
  if (props.bordered || props.ghost || props.light) {
    return {
      ...defaultDisabledCss,
      bg: 'transparent',
      borderColor: '$accents2'
    };
  }
  if (props.flat) {
    return {
      ...defaultDisabledCss,
      bg: '$accents1'
    };
  }

  return {};
};
