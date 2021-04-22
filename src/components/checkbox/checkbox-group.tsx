import React, { useEffect, useMemo, useState } from 'react';
import { CheckboxContext } from './checkbox-context';
import useWarning from '@hooks/use-warning';
import { NormalSizes } from '@utils/prop-types';
import withDefaults from '@utils/with-defaults';

interface Props {
  value: string[];
  disabled?: boolean;
  size?: NormalSizes;
  onChange?: (values: string[]) => void;
  className?: string;
}

const defaultProps = {
  disabled: false,
  size: 'small' as NormalSizes,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CheckboxGroupProps = Props & typeof defaultProps & NativeAttrs;

export const getCheckboxSize = (size: NormalSizes): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.75rem',
    small: '.875rem',
    medium: '1rem',
    large: '1.125rem',
  };
  return sizes[size];
};

const CheckboxGroup: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = ({
  disabled,
  onChange,
  value,
  size,
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
      disabledAll: disabled,
      inGroup: true,
      values: selfVal,
    };
  }, [disabled, selfVal]);
  const fontSize = useMemo(() => getCheckboxSize(size), [size]);

  useEffect(() => {
    setSelfVal(value);
  }, [value.join(',')]);

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div className={`group ${className}`} {...props}>
        {children}
        <style jsx>{`
          .group :global(label) {
            margin-right: calc(${fontSize} * 2);
            --checkbox-size: ${fontSize};
          }
        `}</style>
      </div>
    </CheckboxContext.Provider>
  );
};

export default withDefaults(CheckboxGroup, defaultProps);
