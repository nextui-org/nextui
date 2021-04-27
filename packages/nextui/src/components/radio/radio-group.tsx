import React, { useEffect, useMemo, useState } from 'react';
import withDefaults from '@utils/with-defaults';
import { RadioContext } from './radio-context';
import { NormalSizes, NormalColors } from '@utils/prop-types';

interface Props {
  value?: string | number;
  initialValue?: string | number;
  disabled?: boolean;
  color?: NormalColors | string;
  textColor?: NormalColors | string;
  size?: NormalSizes;
  onChange?: (value: string | number) => void;
  className?: string;
  row?: boolean;
}

const defaultProps = {
  disabled: false,
  size: 'medium' as NormalSizes,
  color: 'primary' as NormalColors,
  textColor: 'default' as NormalColors,
  className: '',
  row: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type RadioGroupProps = Props & typeof defaultProps & NativeAttrs;

export const getRadioSize = (size: NormalSizes): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.875rem',
    small: '1rem',
    medium: '1.125rem',
    large: '1.3rem',
    xlarge: '1.5rem',
  };
  return sizes[size];
};

const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
  disabled,
  onChange,
  value,
  size,
  color,
  textColor,
  children,
  className,
  initialValue,
  row,
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
      color,
      textColor,
      value: selfVal,
    };
  }, [disabled, selfVal]);

  const fontSize = useMemo(() => getRadioSize(size), [size]);
  const groupGap = `calc(${fontSize} * 1)`;

  useEffect(() => {
    if (value === undefined) return;
    setSelfVal(value);
  }, [value]);

  return (
    <RadioContext.Provider value={providerValue}>
      <div className={`radio-group ${className}`} {...props}>
        {children}
      </div>
      <style jsx>{`
        .radio-group {
          display: flex;
          flex-direction: ${row ? 'col' : 'column'};
        }
        .radio-group :global(.radio) {
          margin-top: ${row ? 0 : groupGap};
          margin-left: ${row ? groupGap : 0};
          --radio-size: ${fontSize};
        }
        .radio-group :global(.radio:first-of-type) {
          margin: 0;
        }
      `}</style>
    </RadioContext.Provider>
  );
};

export default withDefaults(RadioGroup, defaultProps);
