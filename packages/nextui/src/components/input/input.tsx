import React, {
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useTheme from '../../hooks/use-theme';
import InputLabel from './input-label';
import InputBlockLabel from './input-block-label';
import InputIcon from './input-icon';
import InputClearIcon from './input-icon-clear';
import Textarea from '../textarea/textarea';
import InputPassword from './password';
import { getSizes, getColors } from './styles';
import { getId } from '../../utils/collections';
import { Props, defaultProps } from './input-props';
import { getNormalRadius, getNormalWeight } from '../../utils/dimensions';
import clsx from '../../utils/clsx';
import useWarning from '../../hooks/use-warning';

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;
export type InputProps = Props & typeof defaultProps & NativeAttrs;

const simulateChangeEvent = (
  el: HTMLInputElement,
  event: React.MouseEvent<HTMLDivElement>
): React.ChangeEvent<HTMLInputElement> => {
  return {
    ...event,
    target: el,
    currentTarget: el,
  };
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>
>(
  (
    {
      label,
      labelPlaceholder,
      labelLeft,
      labelRight,
      size,
      helperText,
      color: colorProp,
      status,
      icon,
      iconRight,
      iconClickable,
      onIconClick,
      initialValue,
      onChange,
      readOnly,
      value,
      onClearClick,
      clearable,
      shadow,
      animated,
      required,
      width,
      className,
      onBlur,
      onFocus,
      autoComplete,
      placeholder,
      borderWeight: borderWeightProp,
      children,
      disabled,
      bordered,
      underlined,
      rounded,
      ...props
    },
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current);

    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const [hover, setHover] = useState<boolean>(false);

    const { heightRatio, fontSize } = useMemo(() => getSizes(size), [size]);

    const isControlledComponent = useMemo(() => value !== undefined, [value]);

    const inputLabel = useMemo(
      () => label || labelPlaceholder,
      [label, labelPlaceholder]
    );
    const inputPlaceholder = useMemo(
      () => (labelPlaceholder ? '' : placeholder),
      [placeholder, labelPlaceholder]
    );
    const iconClasses = useMemo(
      () => (iconRight ? 'right-icon' : icon ? 'left-icon' : ''),
      [icon, iconRight]
    );

    if (underlined && bordered) {
      useWarning(
        'Using underlined and bordered at the same time will have no effect.'
      );
    }
    if (underlined && rounded) {
      useWarning(
        'Using underlined and rounded at the same time will have no effect.'
      );
    }

    const {
      bgColor,
      color,
      helperColor,
      placeholderColor,
      borderColor,
      hoverBorder,
      shadowColor,
    } = useMemo(
      () => getColors(theme, colorProp, status),
      [theme.palette, theme.expressiveness, colorProp, status]
    );

    const radius = useMemo(
      () => getNormalRadius(size, rounded),
      [size, rounded]
    );

    const borderWeight = useMemo(
      () =>
        bordered || underlined ? getNormalWeight(borderWeightProp) : '0px',
      [bordered, underlined, borderWeightProp]
    );

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      setSelfValue(event.target.value);
      onChange && onChange(event);
    };
    const clearHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      setSelfValue('');
      onClearClick && onClearClick(event);
      /* istanbul ignore next */
      if (!inputRef.current) return;

      const changeEvent = simulateChangeEvent(inputRef.current, event);
      changeEvent.target.value = '';
      onChange && onChange(changeEvent);
      inputRef.current.focus();
    };

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(true);
      onFocus && onFocus(e);
    };
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(false);
      onBlur && onBlur(e);
    };

    const iconClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onIconClick && onIconClick(e);
    };
    const iconProps = useMemo(
      () => ({
        ratio: heightRatio,
        clickable: iconClickable,
        onClick: iconClickHandler,
      }),
      [heightRatio, iconClickable, iconClickHandler]
    );

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string);
      }
    });

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue };

    const inputProps = {
      ...props,
      ...controlledValue,
    };

    const inputId = useMemo(
      () => inputProps.id || `next-ui-${getId()}`,
      [inputProps.id]
    );

    return (
      <div className="with-label">
        {inputLabel && (
          <InputBlockLabel
            animated={animated}
            color={hoverBorder}
            status={status}
            hasIcon={!!icon}
            selfValue={selfValue}
            heightRatio={heightRatio}
            asPlaceholder={!!labelPlaceholder}
            placeholderColor={placeholderColor}
            hover={hover}
            htmlFor={inputId}
            label={inputLabel}
          />
        )}
        <div
          className={clsx(
            'input-container',
            { hover, 'read-only': readOnly, shadow },
            className
          )}
        >
          <div
            className={clsx('input-wrapper', {
              hover,
              disabled,
              bordered,
              underlined,
            })}
          >
            {labelLeft && (
              <InputLabel
                bgColor={bgColor}
                borderWeight={borderWeight}
                underlined={underlined}
                bordered={bordered}
                color={placeholderColor}
                radius={radius}
                fontSize={fontSize}
              >
                {labelLeft}
              </InputLabel>
            )}
            {icon && <InputIcon status={status} icon={icon} {...iconProps} />}
            <input
              type="text"
              ref={inputRef}
              className={clsx({ disabled }, iconClasses)}
              placeholder={inputPlaceholder}
              disabled={disabled}
              readOnly={readOnly}
              onFocus={focusHandler}
              onBlur={blurHandler}
              onChange={changeHandler}
              autoComplete={autoComplete}
              aria-readonly={readOnly}
              aria-required={required}
              id={inputId}
              {...inputProps}
            />
            {clearable && (
              <InputClearIcon
                status={status}
                visible={Boolean(selfValue)}
                hasIcon={!!iconRight}
                heightRatio={heightRatio}
                disabled={disabled || readOnly}
                onClick={clearHandler}
              />
            )}
            {iconRight && (
              <InputIcon status={status} icon={iconRight} {...iconProps} />
            )}
            {labelRight && (
              <InputLabel
                bgColor={bgColor}
                borderWeight={borderWeight}
                bordered={bordered}
                underlined={underlined}
                color={placeholderColor}
                radius={radius}
                fontSize={fontSize}
                isRight={true}
              >
                {labelRight}
              </InputLabel>
            )}
          </div>
        </div>
        <div
          className={clsx('input-helper-text-container', {
            'with-value': !!helperText,
          })}
        >
          {helperText && <p className="input-helper-text">{helperText}</p>}
        </div>
        <style jsx>{`
          .with-label {
            width: ${width};
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            -webkit-box-align: center;
          }
          .input-container {
            width: 100%;
            display: inline-flex;
            align-items: center;
            transition: ${animated ? 'all 0.25s ease' : 'none'};
            border-radius: ${radius};
            height: calc(${heightRatio} * ${theme.layout.gap});
          }
          .input-wrapper {
            flex: 1;
            display: inline-flex;
            vertical-align: middle;
            align-items: center;
            height: 100%;
            user-select: none;
            border-radius: ${radius};
            background: ${bgColor};
          }
          .input-wrapper.bordered {
            background: transparent;
            border: none;
            box-shadow: 0 0 0 ${!underlined ? borderWeight : '0px'}
              ${borderColor};
            transition: ${animated ? 'box-shadow 0.25s ease' : 'none'};
          }
          .input-wrapper.underlined {
            background: transparent;
          }
          .input-wrapper.underlined::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: ${borderWeight};
            z-index: 1;
            background: ${borderColor};
          }
          .input-wrapper.underlined::before {
            position: absolute;
            content: '';
            z-index: 2;
            width: 0;
            bottom: 0;
            height: 2px;
            left: 50%;
            transform: translate(-50%);
            background: ${hoverBorder};
            transition: ${animated ? 'width 0.25s ease' : 'none'};
          }
          .input-wrapper.hover.underlined::before {
            width: 100%;
          }
          .input-wrapper.disabled {
            background-color: ${theme.palette.accents_2};
            border-color: ${theme.palette.accents_2};
            cursor: not-allowed;
          }
          .input-helper-text-container {
            position: absolute;
            bottom: calc(${heightRatio} * ${theme.layout.gapHalf} * -1);
            opacity: 0;
            transition: ${animated ? 'opacity 0.25s ease' : 'none'};
          }
          .input-helper-text-container.with-value {
            opacity: 1;
          }
          .input-helper-text {
            margin: 2px 0 0 10px;
            font-size: 0.7rem;
            color: ${helperColor};
          }
          input.disabled {
            color: ${theme.palette.accents_4};
            cursor: not-allowed;
          }
          .input-container.hover:not(.read-only) {
            transform: ${animated && !underlined ? 'translateY(-2px)' : 'none'};
          }
          .input-container.shadow.hover:not(.read-only) {
            box-shadow: ${shadow && !underlined ? shadowColor : 'none'};
          }
          .input-container:hover .input-wrapper.bordered,
          .input-container.hover:not(.read-only) .input-wrapper.bordered {
            border-color: ${hoverBorder};
            box-shadow: 0 0 0 ${!underlined ? borderWeight : '0px'}
              ${hoverBorder};
          }

          input:focus::placeholder {
            opacity: 0;
            transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
          }
          input {
            margin: 4px 10px;
            padding: 0;
            box-shadow: none;
            font-size: ${fontSize};
            background-color: transparent;
            border: none;
            color: ${color};
            outline: none;
            border-radius: 0;
            width: 100%;
            min-width: 0;
            -webkit-appearance: none;
          }
          input.left-icon {
            margin-left: 0;
          }
          input.right-icon {
            margin-right: 0;
          }
          input::placeholder {
            color: ${placeholderColor};
            transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
            -moz-transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
            -ms-transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
            -webkit-transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:active,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
            -webkit-text-fill-color: ${color} !important;
          }
        `}</style>
      </div>
    );
  }
);

type InputComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Textarea: typeof Textarea;
  Password: typeof InputPassword;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Input.defaultProps = defaultProps;

export default Input as InputComponent<HTMLInputElement, ComponentProps>;
