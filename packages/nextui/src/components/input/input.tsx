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
import { addColorAlpha } from '../../utils/color';
import { Props, defaultProps } from './input-props';
import { getNormalRadius, getNormalWeight } from '../../utils/dimensions';
import clsx from '../../utils/clsx';

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

    const labelClasses = useMemo(
      () => (labelRight ? 'right-label' : labelLeft ? 'left-label' : ''),
      [labelLeft, labelRight]
    );
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
    const { color, helperColor, borderColor, hoverBorder } = useMemo(
      () => getColors(theme.palette, colorProp),
      [theme.palette, colorProp]
    );

    const radius = useMemo(
      () => getNormalRadius(size, rounded),
      [size, rounded]
    );

    const borderWeight = useMemo(
      () => (bordered ? getNormalWeight(borderWeightProp) : '0px'),
      [bordered, borderWeightProp]
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
            hasIcon={!!icon}
            selfValue={selfValue}
            heightRatio={heightRatio}
            asPlaceholder={!!labelPlaceholder}
            hover={hover}
            htmlFor={inputId}
            label={inputLabel}
          />
        )}
        <div
          className={clsx(
            'input-container',
            { hover, 'read-only': readOnly },
            className
          )}
        >
          {labelLeft && (
            <InputLabel
              radius={radius}
              borderWeight={borderWeight}
              fontSize={fontSize}
            >
              {labelLeft}
            </InputLabel>
          )}
          <div
            className={clsx(
              'input-wrapper',
              { hover, disabled, bordered },
              labelClasses
            )}
          >
            {icon && <InputIcon icon={icon} {...iconProps} />}
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
              id={inputId}
              {...inputProps}
            />
            {clearable && (
              <InputClearIcon
                visible={Boolean(
                  inputRef.current && inputRef.current.value !== ''
                )}
                hasIcon={!!iconRight}
                heightRatio={heightRatio}
                disabled={disabled || readOnly}
                onClick={clearHandler}
              />
            )}
            {iconRight && <InputIcon icon={iconRight} {...iconProps} />}
          </div>
          {labelRight && (
            <InputLabel
              radius={radius}
              borderWeight={borderWeight}
              fontSize={fontSize}
              isRight={true}
            >
              {labelRight}
            </InputLabel>
          )}
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
            transition: all 0.25s ease;
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
            background: ${addColorAlpha(theme.palette.accents_2, 0.7)};
          }
          .input-wrapper.bordered {
            background: transparent;
            border: ${borderWeight} solid ${borderColor};
            transition: border-color 0.25s ease;
          }
          .input-wrapper.left-label {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .input-wrapper.right-label {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
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
            transition: opacity 0.25s ease;
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
            transform: translateY(-2px);
            box-shadow: ${theme.expressiveness.shadowSmall};
          }
          .input-container.hover:not(.read-only) .input-wrapper:not(.bordered) {
            background: ${addColorAlpha(theme.palette.accents_2, 0.9)};
          }
          .input-container:hover .input-wrapper,
          .input-container.hover:not(.read-only) .input-wrapper {
            border-color: ${hoverBorder};
          }
          input:focus::placeholder {
            opacity: 0;
            transition: opacity 0.25s ease 0s;
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
            transition: opacity 0.25s ease 0s;
            -moz-transition: opacity 0.25s ease 0s;
            -ms-transition: opacity 0.25s ease 0s;
            -webkit-transition: opacity 0.25s ease 0s;
          }
          ::placeholder,
          ::-moz-placeholder,
          :-ms-input-placeholder,
          ::-webkit-input-placeholder {
            color: ${theme.palette.accents_3};
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
