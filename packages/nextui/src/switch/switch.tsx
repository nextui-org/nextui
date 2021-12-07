import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import { NormalSizes, SimpleColors } from '../utils/prop-types';
import { getNormalColor, getNormalShadowColor } from '../utils/color';
import { getSizes } from './styles';
import useWarning from '../use-warning';
import useKeyboard, { KeyCode } from '../use-keyboard';
import {
  StyledSwitch,
  StyledSwitchContainer,
  StyledSwitchInput,
  StyledSwitchCircle,
  SwitchContainerVariantsProps
} from './switch.styles';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface SwitchEventTarget {
  checked: boolean;
}

export interface SwitchEvent {
  target: SwitchEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

interface Props {
  checked?: boolean;
  squared?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  icon?: React.ReactNode;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  initialChecked?: boolean;
  onChange?: (ev: SwitchEvent) => void;
  disabled?: boolean;
}

const defaultProps = {
  disabled: false,
  bordered: false,
  shadow: false,
  squared: false,
  initialChecked: false
};

type NativeAttrs = Omit<
  React.LabelHTMLAttributes<unknown>,
  keyof Props | 'css'
>;
export type SwitchProps = Props &
  typeof defaultProps &
  NativeAttrs &
  SwitchContainerVariantsProps;

const preClass = 'nextui-switch';

const Switch: React.FC<SwitchProps> = ({
  initialChecked,
  checked,
  disabled,
  onChange,
  squared,
  bordered,
  shadow,
  icon,
  iconOn,
  iconOff,
  className,
  ...props
}) => {
  const theme = useTheme();
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked);

  if (icon && __DEV__ && (iconOn || iconOff)) {
    useWarning('Remove props "icon" if iconOn or iconOff exists.', 'Switch');
  }

  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
      if (disabled) return;
      const selfEvent: SwitchEvent = {
        target: {
          checked: !selfChecked
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev
      };

      setSelfChecked(!selfChecked);
      onChange && onChange(selfEvent);
    },
    [disabled, selfChecked, onChange]
  );

  const { bindings } = useKeyboard(
    (event: any) => {
      changeHandle(event);
    },
    [KeyCode.Enter, KeyCode.Space],
    {
      disableGlobalEvent: true
    }
  );

  const radius = useMemo(() => (squared ? '2px' : '50%'), [squared]);

  const circleIcon = useMemo(() => {
    const hasIcon = icon || iconOn || iconOff;
    const hasIconOn = Boolean(iconOn);
    const hasIconOff = Boolean(iconOff);
    if (!hasIcon) return null;
    if (hasIconOn && selfChecked) return iconOn;
    if (hasIconOff && !selfChecked) return iconOff;
    return hasIcon;
  }, [selfChecked, icon, iconOn, iconOff]);

  // const switchColor = useMemo(
  //   () =>
  //     disabled
  //       ? theme.palette.accents_4
  //       : getNormalColor(color, theme.palette, theme.palette.success),
  //   [color, disabled, theme.palette]
  // );

  // const shadowColor = useMemo(
  //   () =>
  //     shadow && !disabled
  //       ? getNormalShadowColor(
  //           selfChecked ? color : theme.palette.accents_2,
  //           theme.palette
  //         )
  //       : '',
  //   [theme.palette, color, disabled, shadow, selfChecked]
  // );

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  const getState = useMemo(() => {
    return selfChecked ? 'checked' : 'unchecked';
  }, [selfChecked]);

  return (
    <StyledSwitchContainer data-state={getState} disabled={disabled} {...props}>
      <StyledSwitchInput
        tabIndex={-1}
        type="checkbox"
        className={clsx(`${preClass}-input`)}
        data-state={getState}
        disabled={disabled}
        checked={selfChecked}
        onChange={changeHandle}
      />
      <StyledSwitch
        role="switch"
        tabIndex={disabled ? -1 : 0}
        checked={selfChecked}
        aria-checked={selfChecked}
        aria-disabled={disabled}
        squared={squared}
        className={clsx(preClass, {
          [`${preClass}-checked`]: selfChecked,
          [`${preClass}-disabled`]: disabled
        })}
        {...bindings}
      >
        <StyledSwitchCircle className={`${preClass}-circle`}>
          {circleIcon}
        </StyledSwitchCircle>
      </StyledSwitch>
    </StyledSwitchContainer>
  );
};

const MemoSwitch = React.memo(Switch);

export default withDefaults(MemoSwitch, defaultProps);
