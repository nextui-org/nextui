import React, { useEffect, useMemo, useState } from 'react';
import { CheckboxContext } from './checkbox-context';
import useWarning from '../use-warning';
import { NormalSizes, NormalColors } from '../utils/prop-types';
import {
  StyledCheckboxGroup,
  CheckboxGroupVariantsProps
} from './checkbox.styles';
import withDefaults from '../utils/with-defaults';
import { __DEV__ } from '../utils/assertion';

interface Props {
  value: string[];
  color?: NormalColors;
  textColor?: NormalColors;
  disabled?: boolean;
  size?: NormalSizes;
  onChange?: (values: string[]) => void;
}

const defaultProps = {
  color: 'primary' as NormalColors,
  textColor: 'default' as NormalColors,
  disabled: false,
  size: 'md' as NormalSizes | number
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;
export type CheckboxGroupProps = Props &
  typeof defaultProps &
  NativeAttrs &
  CheckboxGroupVariantsProps;

const CheckboxGroup: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = ({
  color,
  textColor,
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
      textColor,
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

export default withDefaults(CheckboxGroup, defaultProps);
