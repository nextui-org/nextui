import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { NormalSizes, NormalColors, NormalWeights } from '../utils/prop-types';
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context';
import StyledButtonGroup, {
  ButtonGroupVariantsProps
} from './button-group.styles';

interface Props {
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
}

const defaultProps = {
  borderWeight: 'normal' as NormalWeights | undefined,
  size: 'md' as NormalSizes,
  color: 'default' as NormalColors
};

export type ButtonGroupProps = Props & ButtonGroupVariantsProps;

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
        {...props}
      >
        {children}
      </StyledButtonGroup>
    </ButtonGroupContext.Provider>
  );
};

const MemoButtonGroup = React.memo(ButtonGroup);

export default withDefaults(MemoButtonGroup, defaultProps);
