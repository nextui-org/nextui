import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCheckbox } from './checkbox-context';
import CheckboxGroup from './checkbox-group';
import useWarning from '@hooks/use-warning';
import { NormalSizes, NormalColors } from '@utils/prop-types';
import useTheme from '@hooks/use-theme';
import { getIconCheckStyle, getCheckboxSize } from './styles';
import { getNormalColor } from '@utils/index';

interface CheckboxEventTarget {
  checked: boolean;
}

export interface CheckboxEvent {
  target: CheckboxEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

export interface Props {
  color?: NormalColors;
  label?: string;
  line?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
  initialChecked?: boolean;
  onChange?: (e: CheckboxEvent) => void;
  size?: NormalSizes;
  className?: string;
  value?: string;
  style?: object;
}

const defaultProps = {
  color: 'primary' as NormalColors,
  disabled: false,
  initialChecked: false,
  indeterminate: false,
  size: 'medium' as NormalSizes,
  className: '',
  value: '',
};

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;
export type CheckboxProps = Props & typeof defaultProps & NativeAttrs;

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  initialChecked,
  line,
  indeterminate,
  disabled,
  onChange,
  className,
  children,
  size,
  label,
  color,
  value,
  style,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked);
  const {
    color: groupColor,
    updateState,
    inGroup,
    disabledAll,
    values,
  } = useCheckbox();

  const isDisabled = inGroup ? disabledAll || disabled : disabled;
  const theme = useTheme();

  const checkboxColor = useMemo(
    () => getNormalColor(color || groupColor, theme.palette),
    [color, theme.palette]
  );

  const iconCheckStyle = getIconCheckStyle(size, indeterminate);

  if (inGroup && checked) {
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
          checked: !selfChecked,
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev,
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
  return (
    <label className={`${className}`} style={style}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          disabled={isDisabled}
          checked={selfChecked}
          onChange={changeHandle}
          {...props}
        />
        <div className="checkbox-mask">
          <i className={`icon-check ${indeterminate ? 'indeterminate' : ''}`}>
            <span style={iconCheckStyle}>
              <div className="line1" />
              <div className="line2" />
            </span>
          </i>
        </div>
      </div>
      <span className={`text ${line ? 'line-through' : ''}`}>
        {children || label}
      </span>
      <style jsx>{`
        label {
          --checkbox-size: ${fontSize};
          display: inline-flex;
          justify-content: flex-start;
          align-items: center;
          width: auto;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          opacity: ${isDisabled ? 0.75 : 1};
        }
        .checkbox-container {
          width: var(--checkbox-size);
          height: var(--checkbox-size);
          position: relative;
          opacity: ${isDisabled ? '0.4' : '1'};
          z-index: 1;
        }
        .checkbox-mask {
          border-radius: ${theme.layout.radius.sm};
          width: 100%;
          height: 100%;
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
        .checkbox-mask i:not(.icon-check) {
          opacity: 0;
          transition: all 0.25s ease;
          color: ${theme.palette.white};
          font-size: 1.1rem;
          transform: scale(0.5);
        }
        .checkbox-mask:after {
          content: '';
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          background: ${checkboxColor};
          transform: scale(0.5);
          border-radius: inherit;
          opacity: 0;
          transition: all 0.25s ease;
          z-index: -1;
        }
        .checkbox-mask:before {
          content: '';
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          transition: all 0.25s ease;
          z-index: -1;
          border: ${theme.layout.stroke} solid ${theme.palette.accents_2};
          box-sizing: border-box;
        }

        .checkbox-mask .icon-check {
          opacity: 0;
          z-index: 200;
        }
        .icon-check {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          border-radius: inherit;
        }
        .icon-check span .line1 {
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
        .icon-check span .line1:after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          background: ${theme.palette.white};
          transition: all 0.25s ease;
          border-radius: 5px 0px 0px 5px;
        }
        .icon-check span .line2 {
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
        .icon-check span .line2:after {
          content: '';
          position: absolute;
          width: 2px;
          height: 0%;
          background: ${theme.palette.white};
          transition: all 0.25s ease;
          bottom: 0px;
          border-radius: 5px 5px 0px 0px;
        }
        .icon-check.active:before {
          width: 8px;
        }
        .icon-check.active:after {
          width: 4px;
        }
        .icon-check.indeterminate span:after {
          position: relative;
          content: '';
          width: 10px;
          height: 2px;
          background: ${theme.palette.white};
          display: block;
        }
        .icon-check.indeterminate span .line1 {
          transform: rotate(-45deg);
          bottom: 0px;
          right: -1px;
          opacity: 0;
          display: none;
        }
        .icon-check.indeterminate span .line2 {
          right: 0px;
          bottom: -0.14rem;
          transform: rotate(45deg);
          transition: all 0.25s ease;
          height: 11px;
          display: none;
        }
        input {
          position: absolute;
          width: 100%;
          height: 100%;
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
        input:active ~ .checkbox-mask {
          background: ${theme.palette.accents_2};
        }
        input:hover ~ .checkbox-mask {
          background: ${theme.palette.accents_2};
        }
        input:hover ~ .checkbox-mask:before {
          border: 2px solid transparent;
        }
        input:checked ~ .checkbox-mask i:not(.icon-check) {
          opacity: 1;
          transform: scale(1);
          transition: all 0.25s ease 0.15s;
        }
        input:checked ~ .checkbox-mask .icon-check {
          opacity: 1;
        }
        input:checked ~ .checkbox-mask .icon-check span .line1:after {
          width: 100%;
          transition: all 0.25s ease 0.1s;
        }
        input:checked ~ .checkbox-mask .icon-check span .line2:after {
          transition: all 0.2s ease 0.3s;
          height: 100%;
        }
        input:checked ~ .checkbox-mask:after {
          opacity: 1;
          transform: scale(1);
        }
        input:checked ~ .checkbox-mask:before {
          opacity: 0;
          transform: scale(1.2);
        }
        .text {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${theme.palette.text};
          font-size: var(--checkbox-size);
          line-height: var(--checkbox-size);
          padding-left: calc(var(--checkbox-size) * 0.57);
          user-select: none;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
        }
        .line-through {
          opacity: ${selfChecked ? '0.4' : '1'};
        }
        .text:before {
          position: absolute;
          width: ${selfChecked && line ? 'calc(100% - 10px)' : '0px'};
          height: 2px;
          background: ${theme.palette.accents_3};
          content: '';
          transition: all 0.25s ease;
        }
      `}</style>
    </label>
  );
};

Checkbox.defaultProps = defaultProps;

type CheckboxComponent<P = {}> = React.FC<P> & {
  Group: typeof CheckboxGroup;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

export default Checkbox as CheckboxComponent<ComponentProps>;
