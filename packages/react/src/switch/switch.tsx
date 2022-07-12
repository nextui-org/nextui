import React, {useCallback, useEffect, useMemo, useState} from "react";

import withDefaults from "../utils/with-defaults";
import {warn} from "../utils/console";
import useKeyboard, {KeyCode} from "../use-keyboard";
import {CSS} from "../theme/stitches.config";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {
  StyledSwitch,
  StyledSwitchContainer,
  StyledSwitchInput,
  StyledSwitchCircle,
  SwitchContainerVariantsProps,
} from "./switch.styles";

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
  animated?: boolean;
  shadow?: boolean;
  icon?: React.ReactNode;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  initialChecked?: boolean;
  preventDefault?: boolean;
  disabled?: boolean;
  onChange?: (ev: SwitchEvent) => void;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  disabled: false,
  bordered: false,
  shadow: false,
  squared: false,
  animated: true,
  preventDefault: true,
  initialChecked: false,
};

type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;
export type SwitchProps = Props &
  typeof defaultProps &
  NativeAttrs &
  SwitchContainerVariantsProps & {css?: CSS};

const preClass = "nextui-switch";

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
  animated,
  preventDefault,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked);

  if (icon && __DEV__ && (iconOn || iconOff)) {
    warn('Remove props "icon" if iconOn or iconOff exists.', "Switch");
  }

  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
      if (disabled) return;
      const selfEvent: SwitchEvent = {
        target: {
          checked: !selfChecked,
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev,
      };

      setSelfChecked(!selfChecked);
      onChange && onChange(selfEvent);
    },
    [disabled, selfChecked, onChange],
  );

  const {bindings} = useKeyboard(
    (event: any) => {
      changeHandle(event);
    },
    [KeyCode.Enter, KeyCode.Space],
    {
      disableGlobalEvent: true,
      preventDefault,
    },
  );

  const circleIcon = useMemo(() => {
    const hasIcon = icon || iconOn || iconOff;
    const hasIconOn = Boolean(iconOn);
    const hasIconOff = Boolean(iconOff);

    if (!hasIcon) return null;
    if (hasIconOn && selfChecked) return iconOn;
    if (hasIconOff && !selfChecked) return iconOff;

    return hasIcon;
  }, [selfChecked, icon, iconOn, iconOff]);

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  const getState = useMemo(() => {
    return selfChecked ? "checked" : "unchecked";
  }, [selfChecked]);

  return (
    <StyledSwitchContainer animated={animated} data-state={getState} disabled={disabled} {...props}>
      <StyledSwitchInput
        bordered={bordered}
        checked={selfChecked}
        className={clsx(`${preClass}-input`)}
        data-state={getState}
        disabled={disabled}
        tabIndex={-1}
        type="checkbox"
        onChange={changeHandle}
      />
      <StyledSwitch
        animated={animated}
        aria-checked={selfChecked}
        aria-disabled={disabled}
        bordered={bordered}
        checked={selfChecked}
        className={clsx(preClass, `${preClass}--${getState}`, {
          [`${preClass}-checked`]: selfChecked,
          [`${preClass}-disabled`]: disabled,
        })}
        data-state={getState}
        disabled={disabled}
        role="switch"
        shadow={shadow}
        squared={squared}
        tabIndex={disabled ? -1 : 0}
        {...bindings}
      >
        <StyledSwitchCircle className={`${preClass}-circle`}>{circleIcon}</StyledSwitchCircle>
      </StyledSwitch>
    </StyledSwitchContainer>
  );
};

Switch.toString = () => ".nextui-switch";

const MemoSwitch = React.memo(Switch);

export default withDefaults(MemoSwitch, defaultProps);
