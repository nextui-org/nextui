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
import { addColorAlpha } from '../../utils/color';
import { Props, defaultProps } from './input-props';
import { getNormalRadius, getNormalWeight } from '../../utils/dimensions';

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
      labelRight,
      size,
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
      () => (labelRight ? 'right-label' : label ? 'left-label' : ''),
      [label, labelRight]
    );
    const iconClasses = useMemo(
      () => (iconRight ? 'right-icon' : icon ? 'left-icon' : ''),
      [icon, iconRight]
    );
    const { color, borderColor, hoverBorder } = useMemo(
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

    return (
      <div className="with-label">
        {children && <InputBlockLabel>{children}</InputBlockLabel>}
        <div
          className={`input-container ${hover ? 'hover' : ''} ${
            readOnly ? 'read-only' : ''
          } ${className}`}
        >
          {label && (
            <InputLabel
              radius={radius}
              borderWeight={borderWeight}
              fontSize={fontSize}
            >
              {label}
            </InputLabel>
          )}
          <div
            className={`input-wrapper ${hover ? 'hover' : ''} ${
              disabled ? 'disabled' : ''
            } ${labelClasses}`}
          >
            {icon && <InputIcon icon={icon} {...iconProps} />}
            <input
              type="text"
              ref={inputRef}
              className={`${disabled ? 'disabled' : ''} ${iconClasses}`}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              onFocus={focusHandler}
              onBlur={blurHandler}
              onChange={changeHandler}
              autoComplete={autoComplete}
              {...inputProps}
            />
            {clearable && (
              <InputClearIcon
                visible={Boolean(
                  inputRef.current && inputRef.current.value !== ''
                )}
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
        <style jsx>{`
          .with-label {
            display: inline-block;
            width: ${width};
            box-sizing: border-box;
            -webkit-box-align: center;
          }
          .input-container {
            display: inline-flex;
            align-items: center;
            width: ${width};
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
            border: ${borderWeight} solid ${borderColor};
            background: ${addColorAlpha(theme.palette.accents_2, 0.7)};
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
          input.disabled {
            color: ${theme.palette.accents_4};
            cursor: not-allowed;
          }
          .input-container.hover:not(.read-only) {
            transform: translateY(-2px);
            box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.1);
          }
          .input-container.hover:not(.read-only) .input-wrapper {
            border-color: ${hoverBorder};
            background: ${addColorAlpha(theme.palette.accents_2, 0.9)};
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
