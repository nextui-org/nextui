import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import { NormalSizes, NormalColors } from '../utils/prop-types';
import {
  addColorAlpha,
  getNormalColor,
  getNormalShadowColor,
  hexToRGBA,
  isHex
} from '../utils/color';
import { DefaultProps } from '../utils/default-props';
import { getSizes } from './styles';
import useWarning from '../use-warning';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { getSpacingsStyles, getFocusStyles } from '../utils/styles';
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

interface Props extends DefaultProps {
  color?: NormalColors | string;
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
  size?: NormalSizes;
  className?: string;
}

const defaultProps = {
  color: 'primary' as NormalColors,
  size: 'md' as NormalSizes,
  disabled: false,
  bordered: false,
  shadow: false,
  squared: false,
  initialChecked: false,
  className: ''
};

type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;
export type SwitchProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-switch';

const Switch: React.FC<SwitchProps> = ({
  initialChecked,
  checked,
  disabled,
  onChange,
  size,
  squared,
  bordered,
  color,
  shadow,
  icon,
  iconOn,
  iconOff,
  className,
  ...props
}) => {
  const theme = useTheme();
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked);
  const { width, height } = useMemo(() => getSizes(size), [size]);

  const { stringCss } = getSpacingsStyles(theme, props);

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

  const shadowColor = useMemo(
    () =>
      shadow && !disabled
        ? getNormalShadowColor(
            selfChecked ? color : theme.palette.accents_2,
            theme.palette
          )
        : '',
    [theme.palette, color, disabled, shadow, selfChecked]
  );

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  const getState = useMemo(() => {
    return selfChecked ? 'checked' : 'unchecked';
  }, [selfChecked]);

  return (
    <label
      className={clsx(`${preClass}-container`, className)}
      data-state={getState}
      {...props}
    >
      <input
        tabIndex={-1}
        type="checkbox"
        className={clsx(`${preClass}-input`)}
        data-state={getState}
        disabled={disabled}
        checked={selfChecked}
        onChange={changeHandle}
      />
      <div
        role="switch"
        tabIndex={disabled ? -1 : 0}
        aria-checked={selfChecked}
        aria-disabled={disabled}
        className={clsx(
          preClass,
          {
            [`${preClass}-checked`]: selfChecked,
            [`${preClass}-disabled`]: disabled
          },
          focusClassName
        )}
        {...bindings}
      >
        <span className={`${preClass}-circle`}>{circleIcon}</span>
      </div>
      <style jsx>{`
        .${preClass}-container {
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
          ${stringCss};
        }
        .${preClass}-input {
          opacity: 0;
          width: 100%;
          height: ${height};
          position: absolute;
          background: transparent;
          z-index: -1;
        }
        .${preClass} {
          width: ${width};
          height: ${height};
          border-radius: ${squared ? '2px' : height};
          opacity: 1;
          transition: all 0.25s ease;
          position: relative;
          border: ${theme.borderWeights.normal} solid
            ${bordered ? theme.palette.border : 'transparent'};
          background: ${bordered
            ? 'transparent'
            : addColorAlpha(
                theme.palette.accents_3,
                theme.type === 'dark' ? 0.6 : 0.4
              )};
          box-shadow: ${shadowColor};
          padding: 0;
        }
        .${preClass}-circle {
          position: absolute;
          display: flex;
          width: calc(${height} * 0.7);
          height: calc(${height} * 0.7);
          justify-content: center;
          align-items: center;
          top: 50%;
          bottom: 0px;
          transform: translateY(-50%);
          left: ${bordered
            ? 'calc(1px + ' + height + '* 0.02)'
            : `calc(2px + ${height} * 0.02)`};
          transition: left 0.25s ease;
          border-radius: ${radius};
          background: ${bordered
            ? addColorAlpha(
                theme.palette.accents_3,
                theme.type === 'dark' ? 0.6 : 0.4
              )
            : theme.palette.background};
        }
        .${preClass}.${preClass}-checked:hover {
          opacity: 0.8;
        }
        .${preClass}:hover:not(.${preClass}-checked) {
          opacity: 0.8;
        }
        .${preClass}-disabled {
          border-color: ${theme.palette.accents_3};
          background-color: ${theme.palette.accents_3};
        }
        .${preClass}-checked {
          border: 1px solid transparent;
          background: ${switchColor};
        }
        .${preClass}-circle :global(svg) {
          background: transparent;
          height: calc(${height} * 0.44);
          width: calc(${height} * 0.44);
        }
        .${preClass}-checked > .${preClass}-circle {
          left: calc(${width} - ${height} * 0.88);
          background: ${isHex(theme.palette.background)
            ? hexToRGBA(theme.palette.background, 0.6)
            : theme.palette.background};
        }
        .${preClass}-disabled > .${preClass}-circle {
          background: ${theme.palette.accents_2};
        }
      `}</style>
      {focusStyles}
    </label>
  );
};

const MemoSwitch = React.memo(Switch);

export default withDefaults(MemoSwitch, defaultProps);
