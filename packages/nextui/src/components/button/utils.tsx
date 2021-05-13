import React, { ReactNode } from 'react';
import { NormalSizes } from '@utils/prop-types';
import ButtonIcon from './button-icon';
import { ButtonProps } from '@components/button/button';
import { ButtonGroupConfig } from '@components/button/button-group-context';

export const getButtonChildrenWithIcon = (
  auto: boolean,
  size: NormalSizes,
  children: ReactNode,
  icons: {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
  }
) => {
  const { icon, iconRight } = icons;
  const hasIcon = icon || iconRight;
  const isRight = Boolean(iconRight);
  const paddingForAutoMode =
    auto || size === 'mini'
      ? `calc(var(--next-ui-button-height) / 2 + var(--next-ui-button-padding) * .5)`
      : 0;
  if (!hasIcon) return <div className="text">{children}</div>;
  if (React.Children.count(children) === 0) {
    return (
      <ButtonIcon isRight={isRight} isSingle>
        {hasIcon}
      </ButtonIcon>
    );
  }
  return (
    <React.Fragment>
      <ButtonIcon isRight={isRight}>{hasIcon}</ButtonIcon>
      <div className={`text ${isRight ? 'right' : 'left'}`}>
        {children}
        <style jsx>{`
          .left {
            padding-left: ${paddingForAutoMode};
          }
          .right {
            padding-right: ${paddingForAutoMode};
          }
        `}</style>
      </div>
    </React.Fragment>
  );
};

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
    flat: config.flat || props.flat,
    animated: config.animated || props.animated,
    rounded: config.rounded || props.rounded,
    light: config.light || props.light,
    size: config.size || props.size,
    color: config.color || props.color,
    disabled: config.disabled || props.disabled,
  };
};
