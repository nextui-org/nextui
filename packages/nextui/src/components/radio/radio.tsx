import React, { useEffect, useMemo, useState } from 'react';
import useTheme from '../../hooks/use-theme';
import { useRadioContext } from './radio-context';
import RadioGroup, { getRadioSize } from './radio-group';
import RadioDescription from './radio-description';
import { pickChild } from '../../utils/collections';
import useWarning from '../../hooks/use-warning';
import { NormalSizes, SimpleColors } from '../../utils/prop-types';
import { getNormalColor } from '../../utils/color';

interface RadioEventTarget {
  checked: boolean;
}

export interface RadioEvent {
  target: RadioEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

interface Props {
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
  size: 'medium' as NormalSizes | number,
  color: 'primary' as SimpleColors,
  textColor: 'default' as SimpleColors,
  disabled: false,
  squared: false,
  className: '',
};

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;
export type RadioProps = Props & typeof defaultProps & NativeAttrs;

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
  const theme = useTheme();
  const [selfChecked, setSelfChecked] = useState<boolean>(!!checked);
  const {
    value: groupValue,
    disabledAll,
    inGroup,
    color: groupColor,
    textColor: textGroupColor,
    updateState,
  } = useRadioContext();

  const [withoutDescChildren, DescChildren] = pickChild(
    children,
    RadioDescription
  );

  if (inGroup) {
    if (checked !== undefined) {
      useWarning('Remove props "checked" if in the Radio.Group.', 'Radio');
    }
    if (radioValue === undefined) {
      useWarning(
        'Props "value" must be deinfed if in the Radio.Group.',
        'Radio'
      );
    }
    useEffect(() => {
      setSelfChecked(groupValue === radioValue);
    }, [groupValue, radioValue]);
  }

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

  const changeHandler = (event: React.ChangeEvent) => {
    if (isDisabled) return;
    const selfEvent: RadioEvent = {
      target: {
        checked: !selfChecked,
      },
      stopPropagation: event.stopPropagation,
      preventDefault: event.preventDefault,
      nativeEvent: event,
    };
    setSelfChecked(!selfChecked);
    if (inGroup) {
      updateState && updateState(radioValue as string | number);
    }
    onChange && onChange(selfEvent);
  };

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(Boolean(checked));
  }, [checked]);

  return (
    <div className={`radio ${className}`} {...props}>
      <label>
        <input
          type="radio"
          value={radioValue}
          checked={selfChecked}
          onChange={changeHandler}
          {...props}
        />
        <span className="name">
          <span
            className={`point ${selfChecked ? 'active' : ''} ${
              isDisabled ? 'disabled' : ''
            }`}
          />
          {withoutDescChildren}
        </span>
        {DescChildren && DescChildren}
      </label>

      <style jsx>{`
        input {
          opacity: 0;
          visibility: hidden;
          overflow: hidden;
          width: 1px;
          height: 1px;
          top: -1000px;
          right: -1000px;
          position: fixed;
        }
        .radio {
          display: flex;
          width: initial;
          align-items: flex-start;
          position: relative;
          --radio-size: ${fontSize};
        }
        label {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          color: ${labelColor};
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
        }
        .name {
          font-size: var(--radio-size);
          user-select: none;
          display: inline-flex;
          align-items: center;
        }
        .point {
          width: var(--radio-size);
          height: var(--radio-size);
          border-radius: ${radius};
          transition: all 0.25s ease;
          position: relative;
          display: inline-block;
          margin-right: calc(var(--radio-size) * 0.375);
        }
        .point:after {
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
        .point.active:after {
          border: calc(var(--radio-size) * 0.34) solid ${radioColor};
        }
        label:hover .point:not(.active):not(.disabled) {
          background: ${theme.palette.border};
        }
      `}</style>
    </div>
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

export default Radio as RadioComponent<ComponentProps>;
