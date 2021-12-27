import React, { useEffect, useMemo, useState } from 'react';
import { CheckboxContext } from './checkbox-context';
import useWarning from '../use-warning';
import { NormalSizes, NormalColors, SimpleColors } from '../utils/prop-types';
import {
  StyledCheckboxGroup,
  CheckboxGroupVariantsProps
} from './checkbox.styles';
import { CSS } from '../theme/stitches.config';
import withDefaults from '../utils/with-defaults';
import { __DEV__ } from '../utils/assertion';

interface Props {
  value: string[];
  color?: NormalColors;
  labelColor?: SimpleColors;
  disabled?: boolean;
  size?: NormalSizes;
  onChange?: (values: string[]) => void;
}

const defaultProps = {
  color: 'default' as NormalColors,
  labelColor: 'default' as SimpleColors,
  disabled: false,
  size: 'md' as NormalSizes
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type CheckboxGroupProps = Props &
  typeof defaultProps &
  NativeAttrs &
  CheckboxGroupVariantsProps & { css?: CSS };

const CheckboxGroup: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = ({
  color,
  labelColor,
  disabled,
  onChange,
  value,
  size,
  children,
  className,
  style,
  ...props
}) => {
  const [selfVal, setSelfVal] = useState<string[]>([]);
  if (!value && __DEV__) {
    value = [];
    useWarning('Props "value" is required.', 'Checkbox Group');
  }

  const updateState = (val: string, checked: boolean) => {
    const removed = selfVal.filter((v) => v !== val);
    const next = checked ? [...removed, val] : removed;
    setSelfVal(next);
    onChange && onChange(next);
  };

  const providerValue = useMemo(() => {
    return {
      updateState,
      color,
      labelColor,
      size,
      disabledAll: disabled,
      inGroup: true,
      values: selfVal
    };
  }, [disabled, selfVal]);

  useEffect(() => {
    setSelfVal(value);
  }, [value.join(',')]);

  return (
    <CheckboxContext.Provider value={providerValue}>
      <StyledCheckboxGroup role="group" size={size} {...props}>
        {children}
      </StyledCheckboxGroup>
    </CheckboxContext.Provider>
  );
};

CheckboxGroup.toString = () => '.nextui-checkbox-group';

export default withDefaults(CheckboxGroup, defaultProps);
