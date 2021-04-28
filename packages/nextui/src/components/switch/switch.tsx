import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withDefaults from '@utils/with-defaults';
import useTheme from '@hooks/use-theme';
import { NormalSizes, NormalColors } from '@utils/prop-types';
import { getNormalColor } from '@utils/index';
import { getSizes } from './styles';
import useWarning from '@hooks/use-warning';

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
  color?: NormalColors;
  checked?: boolean;
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
  initialChecked: false,
  className: '',
};

type NativeAttrs = Omit<React.LabelHTMLAttributes<unknown>, keyof Props>;
export type SwitchProps = Props & typeof defaultProps & NativeAttrs;

const Switch: React.FC<SwitchProps> = ({
  initialChecked,
  checked,
  disabled,
  onChange,
  size,
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

  if (icon && (iconOn || iconOff)) {
    useWarning('Remove props "icon" if iconOn or iconOff exists.', 'Switch');
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
    [disabled, selfChecked, onChange]
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
        type="checkbox"
        disabled={disabled}
        checked={selfChecked}
        onChange={changeHandle}
      />
      <div
        className={`switch ${selfChecked ? 'checked' : ''} ${
          disabled ? 'disabled' : ''
        }`}
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
          visibility: hidden;
          height: 0;
          opacity: 0;
          width: 0;
          position: absolute;
          background-color: transparent;
          z-index: -1;
        }
        .switch {
          height: ${height};
          width: ${width};
          border-radius: ${height};
          opacity: 1;
          transition: opacity 0.25s ease;
          position: relative;
          border: 1px solid transparent;
          background-color: ${theme.palette.accents_2};
          padding: 0;
        }
        .circle {
          width: calc(${height} - 2px);
          height: calc(${height} - 2px);
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 50%;
          transform: translateY(-50%);
          left: 1px;
          box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 10%),
            0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 8%);
          transition: left 0.2s ease;
          border-radius: 50%;
          background-color: ${theme.palette.background};
        }
        .switch:hover {
          opacity: 0.8;
        }
        .disabled {
          border-color: ${theme.palette.accents_2};
          background-color: ${theme.palette.accents_1};
        }
        .disabled.checked {
          border-color: ${theme.palette.accents_4};
          background-color: ${theme.palette.accents_4};
        }
        .checked {
          background-color: ${switchColor};
        }
        .circle :global(svg) {
          background: transparent;
          height: calc(${height} / 1.8);
          width: calc(${height} / 1.8);
        }
        .checked > .circle {
          left: calc(100% - (${height} - 1px));
          box-shadow: none;
        }
        .disabled > .circle {
          background-color: ${theme.palette.accents_2};
        }
      `}</style>
    </label>
  );
};

const MemoSwitch = React.memo(Switch);

export default withDefaults(MemoSwitch, defaultProps);
