import React, { useEffect, useMemo, useState } from 'react';
import { CheckboxContext } from './checkbox-context';
import useWarning from '../../hooks/use-warning';
import { NormalSizes, NormalColors } from '../../utils/prop-types';
import withDefaults from '../../utils/with-defaults';
import { getCheckboxSize } from './styles';

interface Props {
  value: string[];
  color?: NormalColors;
  textColor?: NormalColors;
  disabled?: boolean;
  size?: NormalSizes;
  onChange?: (values: string[]) => void;
  className?: string;
  row?: boolean;
}

const defaultProps = {
  color: 'primary' as NormalColors,
  textColor: 'default' as NormalColors,
  disabled: false,
  size: 'medium' as NormalSizes,
  className: '',
  row: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CheckboxGroupProps = Props & typeof defaultProps & NativeAttrs;

const CheckboxGroup: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = ({
  color,
  textColor,
  disabled,
  onChange,
  value,
  size,
  row,
  children,
  className,
  ...props
}) => {
  const [selfVal, setSelfVal] = useState<string[]>([]);
  if (!value) {
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
      values: selfVal,
    };
  }, [disabled, selfVal]);

  const fontSize = useMemo(() => getCheckboxSize(size), [size]);
  const groupGap = `calc(${fontSize} * 1)`;

  useEffect(() => {
    setSelfVal(value);
  }, [value.join(',')]);

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div className={`checkbox-group ${className}`} {...props}>
        {children}
        <style jsx>{`
          .checkbox-group :global(.checkbox) {
            margin-top: ${row ? 0 : groupGap};
            margin-right: ${row ? groupGap : 0};
            margin-bottom: ${row ? groupGap : 0};
            --checkbox-size: ${fontSize};
          }
          .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            flex-direction: ${row ? 'col' : 'column'};
          }
        `}</style>
      </div>
    </CheckboxContext.Provider>
  );
};

export default withDefaults(CheckboxGroup, defaultProps);
