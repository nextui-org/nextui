import React, { useEffect, useMemo, useState } from 'react';
import { useRadioContext } from './radio-context';
import RadioGroup from './radio-group';
import RadioDescription from './radio-description';
import { pickChild } from '../utils/collections';
import useWarning from '../use-warning';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { SimpleColors, NormalSizes } from '../utils/prop-types';
import {
  StyledRadio,
  StyledRadioDescription,
  StyledRadioInput,
  StyledRadioPoint,
  RadioVariantsProps
} from './radio.styles';
import withDefaults from '../utils/with-defaults';
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

interface Props {
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

type NativeAttrs = Omit<
  React.InputHTMLAttributes<unknown>,
  keyof Props | 'css'
>;

export type RadioProps = Props &
  typeof defaultProps &
  NativeAttrs &
  RadioVariantsProps;

const preClass = 'nextui-radio';

const Radio: React.FC<React.PropsWithChildren<RadioProps>> = ({
  checked,
  onChange,
  disabled,
  color,
  size,
  textColor,
  value: radioValue,
  preventDefault,
  children,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState<boolean>(!!checked);

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

  const isDisabled = useMemo(
    () => disabled || disabledAll,
    [disabled, disabledAll]
  );

  const radioColor = (color !== 'default' ? color : groupColor) as SimpleColors;
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
      {...props}
      {...bindings}
    >
      <StyledRadioInput
        type="radio"
        tabIndex={-1}
        value={radioValue}
        checked={selfChecked}
        onChange={changeHandler}
        className={`${preClass}-input`}
        {...props}
      />
      <StyledRadioDescription
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
      </StyledRadioDescription>
      {DescChildren && DescChildren}
    </StyledRadio>
  );
};

type RadioComponent<P = {}> = React.FC<P> & {
  Group: typeof RadioGroup;
  Desc: typeof RadioDescription;
  Description: typeof RadioDescription;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs &
  RadioVariantsProps;

Radio.defaultProps = defaultProps;

if (__DEV__) {
  Radio.displayName = 'NextUI - Radio';
}

export default withDefaults(
  Radio,
  defaultProps
) as RadioComponent<ComponentProps>;
