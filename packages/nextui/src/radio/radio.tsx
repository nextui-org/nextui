import React, { useEffect, useMemo, useState } from 'react';
import useTheme from '../use-theme';
import { useRadioContext } from './radio-context';
import RadioGroup, { getRadioSize } from './radio-group';
import RadioDescription from './radio-description';
import { pickChild } from '../utils/collections';
import useWarning from '../use-warning';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { getFocusStyles } from '../utils/styles';
import { NormalSizes, SimpleColors } from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import { getNormalColor } from '../utils/color';
import VisuallyHidden from '../utils/visually-hidden';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface RadioEventTarget {
  checked: boolean;
}

export interface RadioEvent {
  target: RadioEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

interface Props extends DefaultProps {
  checked?: boolean;
  value?: string | number;
  squared?: boolean;
  size?: NormalSizes | number;
  color?: SimpleColors | string;
  textColor?: SimpleColors | string;
  className?: string;
  disabled?: boolean;
  onChange?: (e: RadioEvent) => void;
}

const defaultProps = {
  size: 'md' as NormalSizes | number,
  color: 'primary' as SimpleColors,
  textColor: 'default' as SimpleColors,
  disabled: false,
  squared: false,
  className: ''
};

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;
export type RadioProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-radio';

const Radio: React.FC<React.PropsWithChildren<RadioProps>> = ({
  className,
  checked,
  onChange,
  squared,
  disabled,
  size,
  color,
  textColor,
  value: radioValue,
  children,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState<boolean>(!!checked);
  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

  const {
    value: groupValue,
    disabledAll,
    inGroup,
    color: groupColor,
    textColor: textGroupColor,
    updateState
  } = useRadioContext();

  const [withoutDescChildren, DescChildren] = pickChild(
    children,
    RadioDescription
  );

  if (inGroup && __DEV__) {
    if (checked !== undefined) {
      useWarning('Remove props "checked" if in the Radio.Group.', 'Radio');
    }
    if (radioValue === undefined) {
      useWarning(
        'Props "value" must be deinfed if in the Radio.Group.',
        'Radio'
      );
    }
  }

  useEffect(() => {
    setSelfChecked(groupValue === radioValue);
  }, [groupValue, radioValue]);

  const fontSize = useMemo(() => getRadioSize(size), [size]);
  const isDisabled = useMemo(
    () => disabled || disabledAll,
    [disabled, disabledAll]
  );
  const radius = squared ? '2px' : '50%';

  const radioColor = useMemo(
    () =>
      isDisabled
        ? theme.palette.accents_4
        : getNormalColor(
            color || groupColor,
            theme.palette,
            theme.palette.foreground
          ),
    [color, groupColor, isDisabled, theme.palette]
  );

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

  const { className: focusClassName, styles: focusStyles } =
    getFocusStyles(theme);

  const changeHandler = (event: React.ChangeEvent) => {
    if (isDisabled || (inGroup && selfChecked)) return;
    const selfEvent: RadioEvent = {
      target: {
        checked: !selfChecked
      },
      stopPropagation: event.stopPropagation,
      preventDefault: event.preventDefault,
      nativeEvent: event
    };
    setSelfChecked(!selfChecked);
    if (inGroup) {
      updateState && updateState(radioValue as string | number);
    }
    onChange && onChange(selfEvent);
  };

  const { bindings } = useKeyboard(
    (event: any) => {
      changeHandler(event);
    },
    [KeyCode.Enter, KeyCode.Space],
    {
      disableGlobalEvent: true
    }
  );
  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(Boolean(checked));
  }, [checked]);

  return (
    <label
      className={clsx(preClass, className)}
      aria-checked={selfChecked}
      {...props}
      {...bindings}
    >
      <VisuallyHidden>
        <input
          type="radio"
          tabIndex={-1}
          value={radioValue}
          checked={selfChecked}
          onChange={changeHandler}
          className={`${preClass}-input`}
          {...props}
        />
      </VisuallyHidden>
      <span className={`${preClass}-name`}>
        <span
          tabIndex={disabled ? -1 : 0}
          className={clsx(
            `${preClass}-point`,
            {
              [`${preClass}-active`]: selfChecked,
              [`${preClass}-disabled`]: isDisabled
            },
            focusClassName
          )}
        />
        {withoutDescChildren}
      </span>
      {DescChildren && DescChildren}
      <style jsx>{`
        .${preClass}-input {
          opacity: 0;
          overflow: hidden;
          width: 1px;
          height: 1px;
          top: -1000px;
          right: -1000px;
          position: fixed;
        }
        .${preClass} {
          display: flex;
          width: initial;
          align-items: flex-start;
          position: relative;
          flex-direction: column;
          justify-content: flex-start;
          color: ${labelColor};
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          --radio-size: ${fontSize};
          ${stringCss};
        }
        .${preClass}-name {
          font-size: var(--radio-size);
          user-select: none;
          display: inline-flex;
          align-items: center;
        }
        .${preClass}-point {
          width: var(--radio-size);
          height: var(--radio-size);
          border-radius: ${radius};
          transition: all 0.25s ease;
          position: relative;
          display: inline-block;
          margin-right: calc(var(--radio-size) * 0.375);
        }
        .${preClass}-point:after {
          content: '';
          display: block;
          position: absolute;
          width: var(--radio-size);
          height: var(--radio-size);
          border-radius: ${radius};
          box-sizing: border-box;
          transition: all 0.25s ease;
          border: 2px solid ${theme.palette.border};
        }
        .${preClass}-point.${preClass}-active:after {
          border: calc(var(--radio-size) * 0.34) solid ${radioColor};
        }
        .${preClass}:hover
          .${preClass}-point:not(.${preClass}-active):not(.${preClass}-disabled) {
          background: ${theme.palette.border};
        }
      `}</style>
      {focusStyles}
    </label>
  );
};

type RadioComponent<P = {}> = React.FC<P> & {
  Group: typeof RadioGroup;
  Desc: typeof RadioDescription;
  Description: typeof RadioDescription;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Radio.defaultProps = defaultProps;

if (__DEV__) {
  Radio.displayName = 'NextUI - Radio';
}

export default Radio as RadioComponent<ComponentProps>;
