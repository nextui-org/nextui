import React, {
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
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
import { getSpacingsStyles } from '../utils/styles';
import clsx from '../utils/clsx';
import { isEmpty } from '../utils/assertion';
import useWarning from '../use-warning';
import VisuallyHidden from '../utils/visually-hidden';
import { __DEV__ } from '../utils/assertion';

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;
export type InputProps = Props & typeof defaultProps & NativeAttrs;

const simulateChangeEvent = (
  el: FormElement,
  event: React.MouseEvent<HTMLButtonElement>
): React.ChangeEvent<FormElement> => {
  return {
    ...event,
    target: el,
    currentTarget: el
  };
};

const preClass = 'nextui-input';

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
      width: widthProp,
      className,
      onBlur,
      onFocus,
      autoComplete,
      placeholder,
      fullWidth,
      borderWeight: borderWeightProp,
      disabled,
      bordered,
      underlined,
      rounded,
      style,
      ...props
    },
    ref: React.Ref<FormElement | null>
  ) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => inputRef.current);

    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const [hover, setHover] = useState<boolean>(false);

    const spacingStyles = getSpacingsStyles(theme, props);

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

    const width = useMemo(() => {
      if (fullWidth) return '100%';
      if (widthProp) return widthProp;
      return 'initial';
    }, [fullWidth, widthProp]);

    if (underlined && __DEV__) {
      bordered &&
        useWarning(
          'Using underlined and bordered at the same time will have no effect.'
        );
      rounded &&
        useWarning(
          'Using underlined and rounded at the same time will have no effect.'
        );
    }

    const {
      color,
      bgColor,
      helperColor,
      placeholderColor,
      borderColor,
      hoverBorder,
      shadowColor
    } = useMemo(
      () => getColors(theme, disabled, colorProp, status, helperColorProp),
      [
        theme.palette,
        theme.shadows,
        colorProp,
        helperColorProp,
        status,
        disabled
      ]
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
    const clearHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        onClick: contentClickHandler
      }),
      [heightRatio, contentClickable, contentClickHandler]
    );

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string);
      }
    });

    const isTextarea = useMemo(() => Component === 'textarea', [Component]);

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue };

    const inputProps = {
      ...props,
      ...controlledValue
    };

    const { inputId, labelId } = useMemo(() => {
      const nextuiId = getId();
      return {
        inputId: inputProps.id || `${preClass}-${nextuiId}`,
        labelId: !isEmpty(inputProps.id)
          ? `${preClass}-label-${inputProps.id}`
          : `${preClass}-label-${nextuiId}`
      };
    }, [inputProps.id]);

    if (inputLabel) {
      inputProps['aria-labelledby'] = labelId;
    }

    const getState = useMemo(() => {
      return hover
        ? 'hover'
        : disabled
        ? 'disabled'
        : readOnly
        ? 'read-only'
        : selfValue
        ? 'with-value'
        : 'normal';
    }, [hover, disabled, readOnly, selfValue]);

    return (
      <div
        data-state={getState}
        className={`${preClass}-main-container`}
        style={{ ...style, ...spacingStyles }}
      >
        {inputLabel && (
          <InputBlockLabel
            labelId={labelId}
            fontSize={fontSize}
            isTextarea={isTextarea}
            bordered={bordered}
            underlined={underlined}
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
            `${preClass}-container`,
            {
              [`${preClass}-container-input`]: !isTextarea,
              [`${preClass}-container-textarea`]: isTextarea,
              [`${preClass}-container-read-only`]: readOnly,
              [`${preClass}-container-hover`]: hover
            },
            className
          )}
        >
          <ComponentWrapper
            className={clsx(`${preClass}-wrapper`, {
              [`${preClass}-wrapper-hover`]: hover,
              [`${preClass}-wrapper-disabled`]: disabled,
              [`${preClass}-wrapper-bordered`]: bordered,
              [`${preClass}-wrapper-underlined`]: underlined,
              [`${preClass}-wrapper-shadow`]: shadow,
              'input-wrapper': !isTextarea,
              'textarea-wrapper': isTextarea
            })}
          >
            {!inputLabel && placeholder && (
              <VisuallyHidden>
                <span className={`${preClass}-placeholder`}>{placeholder}</span>
              </VisuallyHidden>
            )}
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
              id={inputId}
              ref={inputRef}
              className={clsx({
                [`${preClass}`]: !isTextarea,
                [`${preClass}-textarea`]: isTextarea,
                [`${preClass}-disabled`]: disabled,
                [`${preClass}-rounded`]: rounded,
                [`${preClass}-${preClass}-right-content`]: contentRight,
                [`${preClass}-left-content`]: contentLeft
              })}
              placeholder={inputPlaceholder}
              disabled={disabled}
              readOnly={readOnly}
              onFocus={focusHandler}
              onBlur={blurHandler}
              onChange={changeHandler}
              autoComplete={autoComplete}
              data-state={getState}
              aria-placeholder={inputPlaceholder}
              aria-readonly={readOnly}
              aria-required={required}
              aria-multiline={isTextarea}
              {...inputProps}
            />
            {clearable && (
              <InputIconClear
                status={status}
                underlined={underlined}
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
          className={clsx(`${preClass}-helper-text-container`, {
            [`${preClass}-helper-text-container-with-value`]: !!helperText
          })}
        >
          {helperText && (
            <p className={`${preClass}-helper-text`}>{helperText}</p>
          )}
        </div>
        <style jsx>{`
          .${preClass}-main-container {
            width: ${width};
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            -webkit-box-align: center;
            border-radius: ${radius};
          }
          .${preClass}-container {
            width: 100%;
            transition: ${animated ? 'all 0.25s ease' : 'none'};
            border-radius: ${radius};
          }
          .${preClass}-container-input {
            display: inline-flex;
            align-items: center;
            height: calc(${heightRatio} * ${theme.spacing[5]});
          }
          .${preClass}-wrapper {
            flex: 1;
            position: relative;
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
          .${preClass}-wrapper.${preClass}-wrapper-shadow: {
            transition: ${animated ? 'all 0.25s ease' : 'none'};
          }
          .${preClass}-wrapper.${preClass}-wrapper-bordered {
            background: transparent;
            border: none;
            box-shadow: 0 0 0 ${!underlined ? borderWeight : '0px'}
              ${borderColor};
            transition: ${animated ? 'box-shadow 0.25s ease' : 'none'};
          }
          .${preClass}-wrapper.${preClass}-wrapper-underlined {
            background: transparent;
          }
          .${preClass}-wrapper.${preClass}-wrapper-underlined::after {
            content: '';
            position: absolute;
            z-index: 1;
            bottom: 0;
            width: 100%;
            height: ${borderWeight};
            background: ${borderColor};
          }
          .${preClass}-wrapper.${preClass}-wrapper-underlined::before {
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
          .${preClass}-wrapper.${preClass}-wrapper-hover.${preClass}-wrapper-underlined::before {
            width: 100%;
          }
          .${preClass}-wrapper.${preClass}-wrapper-disabled {
            cursor: not-allowed;
          }
          .${preClass}-helper-text-container {
            position: absolute;
            opacity: 0;
            bottom: calc(${heightRatio} * ${theme.spacing.sm} * -1);
            transition: ${animated ? 'opacity 0.25s ease' : 'none'};
          }
          .${preClass}-helper-text-container.${preClass}-helper-text-container-with-value {
            opacity: 1;
          }
          .${preClass}-helper-text {
            margin: 2px 0 0 10px;
            font-size: 0.7rem;
            color: ${helperColor};
          }
          .${preClass}-container.${preClass}-container-hover:not(.${preClass}-container-read-only) {
            transform: ${animated && !underlined ? 'translateY(-2px)' : 'none'};
          }
          .${preClass}-wrapper.${preClass}-wrapper-shadow.${preClass}-wrapper-hover:not(.${preClass}-container-read-only) {
            box-shadow: ${shadow && !underlined ? shadowColor : 'none'};
          }
          .${preClass}-container:hover
            .${preClass}-wrapper.${preClass}-wrapper-bordered,
            .${preClass}-container.${preClass}-container-hover:not(.${preClass}-container-read-only)
            .${preClass}-wrapper.${preClass}-wrapper-bordered {
            border-color: ${hoverBorder};
            box-shadow: 0 0 0 ${!underlined ? borderWeight : '0px'}
              ${hoverBorder};
          }
          input.${preClass}-disabled, textarea.${preClass}-disabled {
            color: ${theme.palette.accents_4};
            cursor: not-allowed;
          }
          input.${preClass}-rounded, textarea.${preClass}-rounded {
            padding: 0 calc(${theme.spacing.sm} * 0.5);
          }
          input:focus::placeholder,
          textarea:focus::placeholder {
            opacity: 0;
            transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
          }
          .${preClass}-wrapper:not(.${preClass}-wrapper-underlined) input {
            margin: 4px 10px;
          }
          .${preClass}-wrapper:not(.${preClass}-wrapper-underlined) textarea {
            margin: 0px;
            padding: ${theme.spacing.xs} ${theme.spacing.sm};
          }
          .${preClass}-wrapper.${preClass}-wrapper-underlined input,
          .${preClass}-wrapper.${preClass}-wrapper-underlined textarea {
            margin: 4px 5px;
          }
          input,
          textarea {
            padding: 0;
            font-size: ${fontSize};
            background-color: transparent;
            border: none;
            color: ${color};
            border-radius: 0;
            outline: none;
            width: 100%;
            height: 100%;
            min-width: 0;
            -webkit-appearance: none;
          }
          input.${preClass}-left-content, textarea.${preClass}-left-content {
            margin-left: 0;
          }
          input.${preClass}-right-content, textarea.${preClass}-right-content {
            margin-right: 0;
          }
          input::placeholder,
          textarea::placeholder {
            color: ${placeholderColor};
            transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
            -moz-transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
            -ms-transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
            -webkit-transition: ${animated ? 'opacity 0.25s ease 0s' : 'none'};
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:active,
          input:-webkit-autofill:focus,
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:active,
          textarea:-webkit-autofill:focus {
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
