import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCheckbox } from './checkbox-context';
import CheckboxGroup from './checkbox-group';
import useWarning from '../use-warning';
import { NormalSizes, NormalColors, SimpleColors } from '../utils/prop-types';
import useKeyboard, { KeyCode } from '../use-keyboard';
import {
  StyledCheckboxLabel,
  StyledCheckboxContainer,
  StyledCheckboxInput,
  StyledCheckboxMask,
  StyledIconCheck,
  CheckboxVariantsProps,
  StyledIconCheckFirstLine,
  StyledIconCheckSecondLine,
  StyledCheckboxText
} from './checkbox.styles';
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

export interface Props {
  color?: NormalColors;
  size?: NormalSizes;
  textColor?: SimpleColors;
  label?: string;
  line?: boolean;
  indeterminate?: boolean;
  animated?: boolean;
  rounded?: boolean;
  checked?: boolean;
  disabled?: boolean;
  initialChecked?: boolean;
  preventDefault?: boolean;
  onChange?: (e: CheckboxEvent) => void;
  className?: string;
  value?: string;
  style?: object;
}

const defaultProps = {
  size: 'md' as NormalSizes,
  color: 'primary' as NormalColors,
  textColor: 'default' as SimpleColors,
  disabled: false,
  preventDefault: true,
  initialChecked: false,
  indeterminate: false,
  rounded: false,
  animated: true,
  className: '',
  value: ''
};

type NativeAttrs = Omit<
  React.InputHTMLAttributes<unknown>,
  keyof Props | 'css'
>;
export type CheckboxProps = Props &
  typeof defaultProps &
  CheckboxVariantsProps &
  NativeAttrs;

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  initialChecked,
  line,
  rounded,
  indeterminate,
  disabled,
  onChange,
  size,
  className,
  children,
  label,
  color,
  textColor,
  animated,
  value,
  preventDefault,
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

  const checkboxColor = color || groupColor;
  const labelColor = textColor || textGroupColor;

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
      disableGlobalEvent: true,
      preventDefault
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
    <StyledCheckboxLabel
      size={size}
      disabled={isDisabled}
      animated={animated}
      className="nextui-checkbox-label"
    >
      <StyledCheckboxContainer
        className="nextui-checkbox-container"
        tabIndex={isDisabled ? -1 : 0}
        color={checkboxColor}
        rounded={rounded}
        disabled={isDisabled}
        animated={animated}
        {...bindings}
      >
        <StyledCheckboxInput
          type="checkbox"
          className={clsx('nextui-checkbox-input', className)}
          tabIndex={-1}
          data-state={getState}
          disabled={isDisabled}
          checked={selfChecked}
          aria-checked={selfChecked && indeterminate ? 'mixed' : selfChecked}
          aria-disabled={isDisabled}
          onChange={changeHandle}
          {...props}
        />
        <StyledCheckboxMask
          checked={selfChecked}
          animated={animated}
          className="nextui-checkbox-mask"
        >
          <StyledIconCheck
            size={size}
            indeterminate={indeterminate}
            checked={selfChecked}
            animated={animated}
            className="nextui-icon-check"
          >
            <StyledIconCheckFirstLine
              indeterminate={indeterminate}
              checked={selfChecked}
              animated={animated}
              className="nextui-icon-check-line1"
            />
            <StyledIconCheckSecondLine
              indeterminate={indeterminate}
              checked={selfChecked}
              animated={animated}
              className="nextui-icon-check-line2"
            />
          </StyledIconCheck>
        </StyledCheckboxMask>
      </StyledCheckboxContainer>
      <StyledCheckboxText
        className="nextui-checkbox-text"
        color={labelColor}
        line={line}
        checked={selfChecked}
        disabled={isDisabled}
        animated={animated}
      >
        {children || label}
      </StyledCheckboxText>
    </StyledCheckboxLabel>
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
