import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import { NormalSizes, NormalColors } from '../utils/prop-types';
import { getNormalColor, hexToRGBA, isHex } from '../utils/color';
import { getSizes } from './styles';
import useWarning from '../use-warning';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { getFocusStyles } from '../utils/styles';
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
  color?: NormalColors | string;
  checked?: boolean;
  squared?: boolean;
  bordered?: boolean;
  icon?: React.ReactNode;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  initialChecked?: boolean;
  onChange?: (ev: SwitchEvent) => void;
  disabled?: boolean;
  size?: NormalSizes;
  className?: string;
}

const defaultProps = {
  color: 'primary' as NormalColors,
  size: 'medium' as NormalSizes,
  disabled: false,
  bordered: false,
  squared: false,
  initialChecked: false,
  className: ''
};

type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;
export type SwitchProps = Props & typeof defaultProps & NativeAttrs;

const Switch: React.FC<SwitchProps> = ({
  initialChecked,
  checked,
  disabled,
  onChange,
  size,
  squared,
  bordered,
  color,
  icon,
  iconOn,
  iconOff,
  className,
  ...props
}) => {
  const theme = useTheme();
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked);
  const { width, height } = useMemo(() => getSizes(size), [size]);

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

  const { className: focusClassName, styles: focusStyles } =
    getFocusStyles(theme);

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

  const switchColor = useMemo(
    () =>
      disabled
        ? theme.palette.accents_4
        : getNormalColor(color, theme.palette, theme.palette.success),
    [color, disabled, theme.palette]
  );

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  return (
    <label className={`${className}`} {...props}>
      <input
        tabIndex={-1}
        type="checkbox"
        disabled={disabled}
        checked={selfChecked}
        onChange={changeHandle}
      />
      <div
        role="switch"
        tabIndex={disabled ? -1 : 0}
        aria-checked={selfChecked}
        aria-disabled={disabled}
        className={`switch ${selfChecked ? 'checked' : ''} ${
          disabled ? 'disabled' : ''
        } ${focusClassName}`}
        {...bindings}
      >
        <span className="circle">{circleIcon}</span>
      </div>
      <style jsx>{`
        label {
          -webkit-tap-highlight-color: transparent;
          display: inline-block;
          vertical-align: center;
          white-space: nowrap;
          user-select: none;
          max-width: ${width};
          transition: all 0.25s ease;
          padding: 3px 0;
          position: relative;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
        }
        input {
          overflow: hidden;
          height: ${height};
          opacity: 0;
          width: 100%;
          position: absolute;
          background: transparent;
          z-index: -1;
        }
        .switch {
          width: ${width};
          height: ${height};
          border-radius: ${squared ? '2px' : height};
          opacity: 1;
          transition: all 0.25s ease;
          position: relative;
          border: ${theme.layout.stroke} solid
            ${bordered ? theme.palette.border : 'transparent'};
          background: ${bordered ? 'transparent' : theme.palette.accents_2};
          box-shadow: inset 0 0 4px 0 rgb(0 0 0 / 5%);
          padding: 0;
        }
        .circle {
          position: absolute;
          display: flex;
          width: calc(${height} * 0.76);
          height: calc(${height} * 0.76);
          justify-content: center;
          align-items: center;
          top: 49.4%;
          bottom: 0px;
          transform: translateY(-50%);
          left: ${bordered ? 'calc(1px + ' + height + '* 0.02)' : '0px'};
          box-shadow: 0px 4px 4px 0 rgb(0 0 0 / 25%);
          transition: left 0.25s ease;
          border-radius: ${radius};
          background: ${bordered
            ? theme.palette.accents_2
            : theme.palette.background};
        }
        .switch.checked:hover {
          opacity: 0.8;
        }
        .switch:hover:not(.checked) {
          opacity: 0.8;
        }
        .disabled {
          border-color: ${theme.palette.accents_3};
          background-color: ${theme.palette.accents_3};
        }
        .checked {
          border: 1px solid transparent;
          background: ${switchColor};
        }
        .circle :global(svg) {
          background: transparent;
          height: calc(${height} * 0.44);
          width: calc(${height} * 0.44);
        }
        .checked > .circle {
          left: calc(${width} - ${height} * 0.88);
          background: ${isHex(theme.palette.background)
            ? hexToRGBA(theme.palette.background, 0.6)
            : theme.palette.background};
        }
        .disabled > .circle {
          background: ${theme.palette.accents_2};
        }
      `}</style>
      {focusStyles}
    </label>
  );
};

const MemoSwitch = React.memo(Switch);

export default withDefaults(MemoSwitch, defaultProps);
