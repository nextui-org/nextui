import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCheckbox } from './checkbox-context';
import CheckboxGroup from './checkbox-group';
import useWarning from '../use-warning';
import { NormalSizes, NormalColors, SimpleColors } from '../utils/prop-types';
import useTheme from '../use-theme';
import { getNormalColor } from '../utils/color';
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
  rounded?: boolean;
  checked?: boolean;
  disabled?: boolean;
  initialChecked?: boolean;
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
  initialChecked: false,
  indeterminate: false,
  rounded: false,
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

const preClass = 'nextui-checkbox';

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

  //   const radius = rounded ? '50%' : '33%';

  const checkboxColor = color || groupColor;
  const labelColor = textColor || textGroupColor;

  //   const labelColor = useMemo(
  //     () =>
  //       isDisabled
  //         ? theme.palette.accents_4
  //         : getNormalColor(
  //             textColor || textGroupColor,
  //             theme.palette,
  //             theme.palette.text
  //           ),
  //     [textColor, textGroupColor, isDisabled, theme.palette]
  //   );

  //   const iconCheckStyle = getIconCheckStyle(size, indeterminate);

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
  //   const fontSize = useMemo(() => getCheckboxSize(size), [size]);

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
      preventDefault: true
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
    <StyledCheckboxLabel size={size} disabled={disabled}>
      <StyledCheckboxContainer
        tabIndex={disabled ? -1 : 0}
        color={checkboxColor}
        rounded={rounded}
        disabled={disabled}
        {...bindings}
      >
        <StyledCheckboxInput
          type="checkbox"
          tabIndex={-1}
          data-state={getState}
          disabled={isDisabled}
          checked={selfChecked}
          aria-checked={selfChecked && indeterminate ? 'mixed' : selfChecked}
          aria-disabled={isDisabled}
          onChange={changeHandle}
          {...props}
        />
        <StyledCheckboxMask checked={selfChecked}>
          <StyledIconCheck size={size} indeterminate={indeterminate}>
            <StyledIconCheckFirstLine indeterminate={indeterminate} />
            <StyledIconCheckSecondLine indeterminate={indeterminate} />
          </StyledIconCheck>
        </StyledCheckboxMask>
      </StyledCheckboxContainer>
      <StyledCheckboxText color={labelColor} line={line} checked={selfChecked}>
        {children || label}
      </StyledCheckboxText>
      <style jsx>{`
        .${preClass}-indeterminate .${preClass}-icon:after {
          position: relative;
          content: '';
          width: 2px;
          height: 2px;
          background: ${theme.palette.white};
          transition: width 0.25s ease 0.1s;
          display: block;
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
      `}</style>
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
