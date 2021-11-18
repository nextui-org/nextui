import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCheckbox } from './checkbox-context';
import CheckboxGroup from './checkbox-group';
import useWarning from '../use-warning';
import { NormalSizes, NormalColors, SimpleColors } from '../utils/prop-types';
import useTheme from '../use-theme';
import { getIconCheckStyle, getCheckboxSize } from './styles';
import { getNormalColor } from '../utils/color';
import { DefaultProps } from '../utils/default-props';
import { getFocusStyles, getSpacingsStyles } from '../utils/styles';
import useKeyboard, { KeyCode } from '../use-keyboard';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface CheckboxEventTarget {
  checked: boolean;
}

export interface CheckboxEvent {
  target: CheckboxEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

export interface Props extends DefaultProps {
  color?: NormalColors | string;
  textColor?: SimpleColors | string;
  label?: string;
  line?: boolean;
  indeterminate?: boolean;
  rounded?: boolean;
  checked?: boolean;
  disabled?: boolean;
  initialChecked?: boolean;
  onChange?: (e: CheckboxEvent) => void;
  size?: NormalSizes | number;
  className?: string;
  value?: string;
  style?: object;
}

const defaultProps = {
  color: 'primary' as NormalColors,
  textColor: 'default' as SimpleColors,
  disabled: false,
  initialChecked: false,
  indeterminate: false,
  rounded: false,
  size: 'md' as NormalSizes | number,
  className: '',
  value: ''
};

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;
export type CheckboxProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-checkbox';

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  initialChecked,
  line,
  rounded,
  indeterminate,
  disabled,
  onChange,
  className,
  children,
  size,
  label,
  color,
  textColor,
  value,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked);
  const {
    color: groupColor,
    textColor: textGroupColor,
    updateState,
    inGroup,
    disabledAll,
    values
  } = useCheckbox();

  const isDisabled = inGroup ? disabledAll || disabled : disabled;
  const theme = useTheme();

  const radius = rounded ? '50%' : '33%';

  const checkboxColor = useMemo(
    () => getNormalColor(color || groupColor, theme.palette),
    [color, groupColor, theme.palette]
  );

  const { stringCss } = getSpacingsStyles(theme, props);

  const { className: focusClassName, styles: focusStyles } =
    getFocusStyles(theme);

  const labelColor = useMemo(
    () =>
      isDisabled
        ? theme.palette.accents_4
        : getNormalColor(
            textColor || textGroupColor,
            theme.palette,
            theme.palette.text
          ),
    [textColor, textGroupColor, isDisabled, theme.palette]
  );

  const iconCheckStyle = getIconCheckStyle(size, indeterminate);

  if (__DEV__ && inGroup && checked) {
    useWarning(
      'Remove props "checked" when [Checkbox] component is in the group.',
      'Checkbox'
    );
  }
  if (inGroup) {
    useEffect(() => {
      const next = values.includes(value);
      if (next === selfChecked) return;
      setSelfChecked(next);
    }, [values.join(',')]);
  }
  const fontSize = useMemo(() => getCheckboxSize(size), [size]);
  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
      if (isDisabled) return;
      const selfEvent: CheckboxEvent = {
        target: {
          checked: !selfChecked
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev
      };
      if (inGroup && updateState) {
        updateState && updateState(value, !selfChecked);
      }

      setSelfChecked(!selfChecked);
      onChange && onChange(selfEvent);
    },
    [updateState, onChange, isDisabled, selfChecked]
  );
  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  const { bindings } = useKeyboard(
    (event: any) => {
      changeHandle(event);
    },
    [KeyCode.Enter, KeyCode.Space],
    {
      disableGlobalEvent: true
    }
  );

  const getState = useMemo(() => {
    return selfChecked && indeterminate
      ? 'mixed'
      : selfChecked
      ? 'checked'
      : 'uncheked';
  }, [selfChecked, indeterminate]);

  return (
    <label className={`${preClass} ${className}`}>
      <div
        tabIndex={disabled ? -1 : 0}
        className={clsx(`${preClass}-container`, focusClassName)}
        {...bindings}
      >
        <input
          type="checkbox"
          tabIndex={-1}
          className={`${preClass}-input`}
          data-state={getState}
          disabled={isDisabled}
          checked={selfChecked}
          aria-checked={selfChecked && indeterminate ? 'mixed' : selfChecked}
          aria-disabled={isDisabled}
          onChange={changeHandle}
          {...props}
        />
        <div className={`${preClass}-mask`}>
          <i
            className={clsx(`${preClass}-icon-check`, {
              [`${preClass}-indeterminate`]: indeterminate
            })}
          >
            <span className={`${preClass}-icon`} style={iconCheckStyle}>
              <div className={`${preClass}-line1`} />
              <div className={`${preClass}-line2`} />
            </span>
          </i>
        </div>
      </div>
      <span
        className={clsx(`${preClass}-text`, {
          [`${preClass}-line-through`]: line
        })}
      >
        {children || label}
      </span>
      <style jsx>{`
        .${preClass} {
          --nextui-checkbox-size: ${fontSize};
          display: inline-flex;
          justify-content: flex-start;
          align-items: center;
          width: auto;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          opacity: ${isDisabled ? 0.75 : 1};
          ${stringCss}
        }
        .${preClass}-container {
          width: var(--nextui-checkbox-size);
          height: var(--nextui-checkbox-size);
          border-radius: ${radius};
          position: relative;
          opacity: ${isDisabled ? '0.4' : '1'};
          transition: box-shadow 0.25s ease;
          z-index: 1;
        }
        .${preClass}-mask {
          border-radius: ${radius};
          width: var(--nextui-checkbox-size);
          height: var(--nextui-checkbox-size);
          position: absolute;
          z-index: 50;
          cursor: pointer;
          pointer-events: none;
          box-sizing: border-box;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -1;
          box-sizing: border-box;
        }
        .${preClass}-mask i:not(.${preClass}-icon-check) {
          opacity: 0;
          transition: all 0.25s ease;
          color: ${theme.palette.white};
          font-size: 1.1rem;
          transform: scale(0.5);
        }
        .${preClass}-mask:after {
          content: '';
          position: absolute;
          top: 0px;
          left: 0px;
          width: var(--nextui-checkbox-size);
          height: var(--nextui-checkbox-size);
          background: ${checkboxColor};
          transform: scale(0.5);
          border-radius: inherit;
          opacity: 0;
          transition: all 0.25s ease;
          z-index: -1;
        }
        .${preClass}-mask:before {
          content: '';
          position: absolute;
          top: 0px;
          left: 0px;
          width: var(--nextui-checkbox-size);
          height: var(--nextui-checkbox-size);
          border-radius: inherit;
          transition: all 0.25s ease;
          z-index: -1;
          border: ${theme.borderWeights.normal} solid ${theme.palette.border};
          box-sizing: border-box;
        }

        .${preClass}-mask .${preClass}-icon-check {
          opacity: 0;
          z-index: 200;
        }
        .${preClass}-icon-check {
          width: var(--nextui-checkbox-size);
          height: var(--nextui-checkbox-size);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          border-radius: inherit;
        }
        .${preClass}-icon .${preClass}-line1 {
          background: transparent;
          content: '';
          position: absolute;
          width: 8px;
          height: 1px;
          transition: all 0.2s ease;
          border-radius: 5px;
          z-index: 100;
          bottom: 0px;
        }
        .${preClass}-icon .${preClass}-line1:after {
          content: '';
          position: absolute;
          left: 0px;
          width: 0%;
          height: 2px;
          background: ${theme.palette.white};
          transition: all 0.25s ease;
          border-radius: 5px 0px 0px 5px;
        }
        .${preClass}-icon .${preClass}-line2 {
          bottom: 0px;
          right: 0rem;
          z-index: 100;
          border-radius: 5px;
          background: transparent;
          content: '';
          position: absolute;
          height: 13px;
          border-radius: 5px;
          transition: all 0.2s ease;
          width: 2px;
        }
        .${preClass}-icon .${preClass}-line2:after {
          content: '';
          position: absolute;
          width: 2px;
          height: 0%;
          background: ${theme.palette.white};
          transition: all 0.25s ease;
          left: 0px;
          bottom: 0px;
          border-radius: 5px 5px 0px 0px;
        }
        .${preClass}-indeterminate .${preClass}-icon:after {
          position: relative;
          content: '';
          width: 2px;
          height: 2px;
          background: ${theme.palette.white};
          transition: width 0.25s ease 0.1s;
          display: block;
        }
        .${preClass}-indeterminate .${preClass}-icon .${preClass}-line1 {
          transform: rotate(-45deg);
          bottom: 0px;
          right: -1px;
          opacity: 0;
          display: none;
        }
        .${preClass}-indeterminate .${preClass}-icon .${preClass}-line2 {
          right: 0px;
          bottom: -0.14rem;
          transform: rotate(45deg);
          transition: all 0.25s ease;
          height: 11px;
          display: none;
        }
        input {
          position: absolute;
          width: var(--nextui-checkbox-size);
          height: var(--nextui-checkbox-size);
          top: 0px;
          left: 0px;
          margin: 0px;
          padding: 0px;
          opacity: 0;
          z-index: 100;
          cursor: pointer;
        }
        input:disabled {
          opacity: 0;
          pointer-events: none;
        }
        input:active ~ .${preClass}-mask {
          background: ${theme.palette.border};
        }
        input:hover ~ .${preClass}-mask {
          background: ${theme.palette.border};
        }
        input:hover ~ .${preClass}-mask:before {
          border: 2px solid transparent;
        }
        input:checked ~ .${preClass}-mask i:not(.${preClass}-icon-check) {
          opacity: 1;
          transform: scale(1);
          transition: all 0.25s ease 0.15s;
        }
        input:checked ~ .${preClass}-mask .${preClass}-icon-check {
          opacity: 1;
        }
        input:checked
          ~ .${preClass}-mask
          .${preClass}-icon
          .${preClass}-line1:after {
          width: 100%;
          transition: all 0.25s ease 0.1s;
        }
        input:checked
          ~ .${preClass}-mask
          .${preClass}-icon-check
          span
          .${preClass}-line2:after {
          transition: all 0.2s ease 0.3s;
          height: 100%;
        }
        input:checked ~ .${preClass}-mask:after {
          opacity: 1;
          transform: scale(1);
        }
        input:checked ~ .${preClass}-mask:before {
          opacity: 0;
          transform: scale(1.2);
        }
        input:checked
          ~ .${preClass}-mask
          .${preClass}-indeterminate
          .${preClass}-icon:after {
          width: 10px;
        }
        .${preClass}-text {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${labelColor};
          font-size: var(--nextui-checkbox-size);
          line-height: var(--nextui-checkbox-size);
          padding-left: calc(var(--nextui-checkbox-size) * 0.57);
          user-select: none;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
        }
        .${preClass}-line-through {
          opacity: ${selfChecked ? '0.6' : '1'};
        }
        .${preClass}-text:before {
          content: '';
          position: absolute;
          width: ${selfChecked && line ? 'calc(100% - 10px)' : '0px'};
          height: 2px;
          background: ${theme.palette.text};
          opcity: 0.8;
          transition: all 0.25s ease;
        }
      `}</style>
      {focusStyles}
    </label>
  );
};

Checkbox.defaultProps = defaultProps;

if (__DEV__) {
  Checkbox.displayName = 'NextUI - Checkbox';
}

type CheckboxComponent<P = {}> = React.FC<P> & {
  Group: typeof CheckboxGroup;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

export default Checkbox as CheckboxComponent<ComponentProps>;
