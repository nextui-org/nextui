import React, { useEffect, useMemo, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import { RadioContext } from './radio-context';
import { NormalSizes, SimpleColors } from '../utils/prop-types';
import { StyledRadioGroup, RadioGroupVariantsProps } from './radio.styles';

interface Props {
  value?: string | number;
  initialValue?: string | number;
  disabled?: boolean;
  color?: SimpleColors;
  textColor?: SimpleColors;
  size?: NormalSizes;
  onChange?: (value: string | number) => void;
}

const defaultProps = {
  disabled: false,
  size: 'md' as NormalSizes | number,
  color: 'default' as SimpleColors,
  textColor: 'default' as SimpleColors
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;
export type RadioGroupProps = Props &
  typeof defaultProps &
  NativeAttrs &
  RadioGroupVariantsProps;

const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
  disabled,
  onChange,
  value,
  size,
  color,
  textColor,
  children,
  initialValue,
  ...props
}) => {
  const [selfVal, setSelfVal] = useState<string | number | undefined>(
    initialValue
  );

  const updateState = (nextValue: string | number) => {
    setSelfVal(nextValue);
    onChange && onChange(nextValue);
  };

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      size,
      color,
      textColor,
      value: selfVal
    };
  }, [disabled, selfVal]);

  useEffect(() => {
    if (value === undefined) return;
    setSelfVal(value);
  }, [value]);

  return (
    <RadioContext.Provider value={providerValue}>
      <StyledRadioGroup role="radiogroup" size={size} {...props}>
        {children}
      </StyledRadioGroup>
    </RadioContext.Provider>
  );
};

export default withDefaults(RadioGroup, defaultProps);
