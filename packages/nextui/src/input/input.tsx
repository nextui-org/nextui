import React, {
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useTheme from '../use-theme';
import { ContentPosition } from '../utils/prop-types';
import InputLabel from './input-label';
import InputBlockLabel from './input-block-label';
import InputContent from './input-content';
import InputIconClear from './input-icon-clear';
import Textarea from '../textarea';
import InputPassword from './input-password';
import { getSizes, getColors } from './styles';
import { getId } from '../utils/collections';
import { Props, FormElement, defaultProps } from './input-props';
import { getNormalRadius, getNormalWeight } from '../utils/dimensions';
import clsx from '../utils/clsx';
import { isEmpty } from '../utils/assertion';
import useWarning from '../use-warning';

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;
export type InputProps = Props & typeof defaultProps & NativeAttrs;

const simulateChangeEvent = (
  el: FormElement,
  event: React.MouseEvent<HTMLDivElement>
): React.ChangeEvent<FormElement> => {
  return {
    ...event,
    target: el,
    currentTarget: el,
  };
};

const Input = React.forwardRef<FormElement, InputProps>(
  (
    {
      as: Component = 'input',
      label,
      labelPlaceholder,
      labelLeft,
      labelRight,
      size,
      helperText,
      color: colorProp,
      helperColor: helperColorProp,
      status,
      contentLeft,
      contentRight,
      contentClickable,
      contentLeftStyling,
      contentRightStyling,
      onContentClick,
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
      disabled,
      bordered,
      underlined,
      rounded,
      ...props
    },
    ref: React.Ref<FormElement | null>
  ) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => inputRef.current);

    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const [hover, setHover] = useState<boolean>(false);

    const { heightRatio, fontSize } = useMemo(() => getSizes(size), [size]);

    const isControlledComponent = useMemo(() => value !== undefined, [value]);

    const inputLabel = useMemo(
      () => label || labelPlaceholder,
      [label, labelPlaceholder]
    );

    const ComponentWrapper = useMemo(
      () => (inputLabel ? 'div' : 'label'),
      [inputLabel]
    );

    const inputPlaceholder = useMemo(
      () => (labelPlaceholder ? '' : placeholder),
      [placeholder, labelPlaceholder]
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
      () => getColors(theme, colorProp, status, helperColorProp),
      [theme.palette, theme.expressiveness, colorProp, helperColorProp, status]
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

    const changeHandler = (event: React.ChangeEvent<FormElement>) => {
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

    const focusHandler = (e: React.FocusEvent<FormElement>) => {
      setHover(true);
      onFocus && onFocus(e);
    };
    const blurHandler = (e: React.FocusEvent<FormElement>) => {
      setHover(false);
      onBlur && onBlur(e);
    };

    const contentClickHandler = (
      key: ContentPosition,
      e: React.MouseEvent<HTMLDivElement>
    ) => {
      if (disabled) return;
      onContentClick && onContentClick(key, e);
    };

    const contentProps = useMemo(
      () => ({
        ratio: heightRatio,
        clickable: contentClickable,
        onClick: contentClickHandler,
      }),
      [heightRatio, contentClickable, contentClickHandler]
    );

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string);
      }
    });

    const isTextArea = useMemo(() => Component === 'textarea', [Component]);

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue };

    const inputProps = {
      ...props,
      ...controlledValue,
    };

    const { inputId, labelId } = useMemo(() => {
      const nextuiId = getId();
      return {
        inputId: inputProps.id || `next-ui-${nextuiId}`,
        labelId: !isEmpty(inputProps.id)
          ? `${inputProps.id}-label`
          : `next-ui-${nextuiId}-label`,
      };
    }, [inputProps.id]);

    if (inputLabel) {
      inputProps['aria-labelledby'] = labelId;
    }

    return (
      <div className="with-label">
        {inputLabel && (
          <InputBlockLabel
            labelId={labelId}
            bordered={bordered}
            animated={animated}
            rounded={rounded}
            color={hoverBorder}
            status={status}
            hasLeftContent={!!contentLeft}
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
            'container',
            {
              'input-container': !isTextArea,
              'textarea-container': isTextArea,
              hover,
              'read-only': readOnly,
              shadow,
            },
            className
          )}
        >
          <ComponentWrapper
            className={clsx('wrapper', {
              hover,
              disabled,
              bordered,
              underlined,
              'input-wrapper': !isTextArea,
              'textarea-wrapper': isTextArea,
            })}
          >
            {labelLeft && (
              <InputLabel
                status={status}
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
            {contentLeft && (
              <InputContent
                isLeft
                applyStyles={contentLeftStyling}
                status={status}
                content={contentLeft}
                {...contentProps}
              />
            )}
            <Component
              type="text"
              ref={inputRef}
              className={clsx({
                disabled,
                rounded,
                'right-content': contentRight,
                'left-content': contentLeft,
              })}
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
              <InputIconClear
                status={status}
                visible={Boolean(selfValue)}
                hasContentRight={!!contentRight}
                heightRatio={heightRatio}
                disabled={disabled || readOnly}
                onClick={clearHandler}
              />
            )}
            {contentRight && (
              <InputContent
                status={status}
                content={contentRight}
                applyStyles={contentRightStyling}
                {...contentProps}
              />
            )}
            {labelRight && (
              <InputLabel
                status={status}
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
          </ComponentWrapper>
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
          .container {
            transition: ${animated ? 'all 0.25s ease' : 'none'};
            border-radius: ${radius};
          }
          .input-container {
            width: 100%;
            display: inline-flex;
            align-items: center;
            transition: ${animated ? 'all 0.25s ease' : 'none'};
            border-radius: ${radius};
            height: calc(${heightRatio} * ${theme.layout.gap});
          }
          .wrapper {
            flex: 1;
            display: inline-flex;
            vertical-align: middle;
            align-items: center;

            user-select: none;
            border-radius: ${radius};
            background: ${bgColor};
          }
          .input-wrapper {
            height: 100%;
          }
          .textarea-wrapper {
            height: auto;
          }
          .wrapper.bordered {
            background: transparent;
            border: none;
            box-shadow: 0 0 0 ${!underlined ? borderWeight : '0px'}
              ${borderColor};
            transition: ${animated ? 'box-shadow 0.25s ease' : 'none'};
          }
          .wrapper.underlined {
            background: transparent;
          }
          .wrapper.underlined::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: ${borderWeight};
            z-index: 1;
            background: ${borderColor};
          }
          .wrapper.underlined::before {
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
          .wrapper.hover.underlined::before {
            width: 100%;
          }
          .wrapper.disabled {
            background-color: ${theme.palette.accents_2};
            border-color: ${theme.palette.accents_2};
            cursor: not-allowed;
          }
          .input-helper-text-container {
            position: absolute;
            opacity: 0;
            bottom: calc(${heightRatio} * ${theme.layout.gapHalf} * -1);
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
          input.rounded {
            padding: 0 ${theme.layout.gapQuarter};
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
          input,
          textarea {
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
          input.left-content {
            margin-left: 0;
          }
          input.right-content {
            margin-right: 0;
          }
          input::placeholder {
            color: ${disabled ? theme.palette.accents_4 : placeholderColor};
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

export default Input as InputComponent<FormElement, ComponentProps>;
