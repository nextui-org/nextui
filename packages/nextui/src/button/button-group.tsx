import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { DefaultProps } from '../utils/default-props';
import { NormalSizes, NormalColors, NormalWeights } from '../utils/prop-types';
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context';
import { VariantProps } from '../theme/stitches.config';
import StyledButtonGroup from './button-group.styles';
import clsx from '../utils/clsx';

interface Props extends DefaultProps {
  disabled?: boolean;
  bordered?: boolean;
  light?: boolean;
  flat?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  ripple?: boolean;
  rounded?: boolean;
  ghost?: boolean;
  borderWeight?: NormalWeights;
  size?: NormalSizes;
  color?: NormalColors;
  className?: string;
}

const defaultProps = {
  borderWeight: 'normal' as NormalWeights | undefined,
  size: 'md' as NormalSizes,
  color: 'default' as NormalColors,
  className: ''
};

type ButtonGroupVariants = Omit<
  VariantProps<typeof StyledButtonGroup>,
  'gradient'
>;

export type ButtonGroupProps = Props & ButtonGroupVariants;

const preClass = 'nextui-button-group';

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (
  groupProps
) => {
  const {
    disabled,
    size,
    color,
    bordered,
    ghost,
    light,
    flat,
    shadow,
    auto,
    animated,
    rounded,
    ripple,
    borderWeight,
    children,
    className,
    ...props
  } = groupProps;

  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      size,
      color,
      bordered,
      light,
      ghost,
      flat,
      shadow,
      auto,
      borderWeight,
      animated,
      rounded,
      ripple,
      isButtonGroup: true
    }),
    [
      disabled,
      animated,
      size,
      ripple,
      color,
      bordered,
      light,
      ghost,
      flat,
      borderWeight
    ]
  );

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <StyledButtonGroup
        size={size}
        bordered={bordered || ghost}
        gradient={groupProps.color === 'gradient'}
        className={clsx(preClass, className)}
        {...props}
      >
        {children}
      </StyledButtonGroup>
    </ButtonGroupContext.Provider>
  );
};

const MemoButtonGroup = React.memo(ButtonGroup);

export default withDefaults(MemoButtonGroup, defaultProps);
