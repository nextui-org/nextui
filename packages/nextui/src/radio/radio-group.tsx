import React, { useEffect, useMemo, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import { RadioContext } from './radio-context';
import useTheme from '../use-theme';
import { NormalSizes, SimpleColors } from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import clsx from '../utils/clsx';

interface Props extends DefaultProps {
  value?: string | number;
  initialValue?: string | number;
  disabled?: boolean;
  color?: SimpleColors;
  textColor?: SimpleColors;
  size?: NormalSizes;
  onChange?: (value: string | number) => void;
  className?: string;
  row?: boolean;
}

const defaultProps = {
  disabled: false,
  size: 'md' as NormalSizes | number,
  color: 'primary' as SimpleColors,
  textColor: 'default' as SimpleColors,
  className: '',
  row: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type RadioGroupProps = Props & typeof defaultProps & NativeAttrs;

export const getRadioSize = (size: NormalSizes | number): string => {
  const sizes: { [key in NormalSizes]: string } = {
    xs: '14px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '28px'
  };
  if (typeof size === 'number') return `${size}px`;
  return sizes[size];
};

const preClass = 'nextui-radio-group';

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

  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

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
      value: selfVal
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
      <div role="radiogroup" className={clsx(preClass, className)} {...props}>
        {children}
      </div>
      <style jsx>{`
        .${preClass} {
          border: 0;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: ${row ? 'row' : 'column'};
          ${stringCss};
        }
        .${preClass} :global(.nextui-radio) {
          margin-top: ${row ? 0 : groupGap};
          margin-right: ${row ? groupGap : 0};
          --radio-size: ${fontSize};
        }
      `}</style>
    </RadioContext.Provider>
  );
};

export default withDefaults(RadioGroup, defaultProps);
