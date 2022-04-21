import React, { useEffect, useMemo, useState, ReactNode } from 'react';
import { useRadioContext } from './radio-context';
import RadioGroup from './radio-group';
import { pickChild } from '../utils/collections';
import useWarning from '../use-warning';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { SimpleColors, NormalSizes } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import withDefaults from '../utils/with-defaults';
import { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import clsx from '../utils/clsx';
import {
  StyledRadio,
  StyledRadioLabel,
  StyledRadioInput,
  StyledRadioPoint,
  StyledRadioDescription,
  RadioVariantsProps
} from './radio.styles';

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
  children?: ReactNode;
  checked?: boolean;
  value?: string | number;
  size?: NormalSizes;
  color?: SimpleColors;
  textColor?: SimpleColors;
  disabled?: boolean;
  preventDefault?: boolean;
  onChange?: (e: RadioEvent) => void;
}

const defaultProps = {
  size: 'md' as NormalSizes,
  color: 'default' as SimpleColors,
  textColor: 'default' as SimpleColors,
  disabled: false,
  preventDefault: true
};

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;

export type RadioProps = Props &
  typeof defaultProps &
  NativeAttrs &
  RadioVariantsProps & { css?: CSS };

const preClass = 'nextui-radio';

export const Radio = React.forwardRef(
  (props: RadioProps, ref: ReactRef<HTMLInputElement>) => {
    const {
      checked,
      onChange,
      disabled,
      color,
      size,
      textColor,
      value: radioValue,
      preventDefault,
      children,
      ...otherProps
    } = props;

    const [selfChecked, setSelfChecked] = useState<boolean>(!!checked);

    const domRef = useDOMRef(ref);

    const {
      value: groupValue,
      disabledAll,
      inGroup,
      color: groupColor,
      size: groupSize,
      textColor: textGroupColor,
      updateState
    } = useRadioContext();

    const [withoutDescChildren, DescChildren] = pickChild(
      children,
      StyledRadioDescription
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

    const isDisabled = useMemo(
      () => disabled || disabledAll,
      [disabled, disabledAll]
    );

    const radioColor = (
      color !== 'default' ? color : groupColor
    ) as SimpleColors;
    const radioSize = (size !== 'md' ? size : groupSize) as NormalSizes;
    const labelColor = (
      textColor !== 'default' ? textColor : textGroupColor
    ) as SimpleColors;

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
        disableGlobalEvent: true,
        preventDefault
      }
    );
    useEffect(() => {
      if (checked === undefined) return;
      setSelfChecked(Boolean(checked));
    }, [checked]);

    return (
      <StyledRadio
        aria-checked={selfChecked}
        disabled={isDisabled}
        active={selfChecked}
        size={radioSize}
        color={radioColor}
        {...otherProps}
        {...bindings}
      >
        <StyledRadioInput
          type="radio"
          tabIndex={-1}
          ref={domRef}
          value={radioValue}
          checked={selfChecked}
          onChange={changeHandler}
          className={`${preClass}-input`}
        />
        <StyledRadioLabel
          color={labelColor}
          disabled={isDisabled}
          className={`${preClass}-name`}
        >
          <StyledRadioPoint
            tabIndex={isDisabled ? -1 : 0}
            className={clsx(`${preClass}-point`, {
              [`${preClass}-active`]: selfChecked,
              [`${preClass}-disabled`]: isDisabled
            })}
          />
          {withoutDescChildren}
        </StyledRadioLabel>
        {DescChildren && DescChildren}
      </StyledRadio>
    );
  }
);

type RadioComponent<P = {}> = React.FC<P> & {
  Group: typeof RadioGroup;
  Desc: typeof StyledRadioDescription;
  Description: typeof StyledRadioDescription;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs &
  RadioVariantsProps & { css?: CSS };

Radio.defaultProps = defaultProps;

if (__DEV__) {
  Radio.displayName = 'NextUI.Radio';
}

Radio.toString = () => '.nextui-radio';

export default withDefaults(
  Radio,
  defaultProps
) as RadioComponent<ComponentProps>;
