import React, { useEffect, useMemo, useState, ReactNode } from 'react';
import withDefaults from '../utils/with-defaults';
import { RadioContext } from './radio-context';
import { NormalSizes, SimpleColors } from '../utils/prop-types';
import { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import { StyledRadioGroup, RadioGroupVariantsProps } from './radio.styles';
import { CSS } from '../theme/stitches.config';

interface Props {
  children?: ReactNode;
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

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type RadioGroupProps = Props &
  typeof defaultProps &
  NativeAttrs &
  RadioGroupVariantsProps & { css?: CSS };

export const RadioGroup = React.forwardRef(
  (props: RadioGroupProps, ref: ReactRef<HTMLDivElement>) => {
    const {
      disabled,
      onChange,
      value,
      size,
      color,
      textColor,
      children,
      initialValue,
      ...otherProps
    } = props;

    const [selfVal, setSelfVal] = useState<string | number | undefined>(
      initialValue
    );

    const domRef = useDOMRef(ref);

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
        <StyledRadioGroup
          ref={domRef}
          role="radiogroup"
          size={size}
          {...otherProps}
        >
          {children}
        </StyledRadioGroup>
      </RadioContext.Provider>
    );
  }
);

if (__DEV__) {
  RadioGroup.displayName = 'NextUI.RadioGroup';
}

RadioGroup.toString = () => '.nextui-radio-group';

export default withDefaults(RadioGroup, defaultProps);
