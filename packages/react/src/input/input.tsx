import React, {
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { useLabel } from '@react-aria/label';
import { ContentPosition } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import Textarea from '../textarea';
import InputPassword from './input-password';
import { Props, FormElement, defaultProps } from './input-props';
import useTheme from '../use-theme';
import useWarning from '../use-warning';
import {
  StyledInput,
  StyledInputMainContainer,
  StyledInputContainer,
  StyledHelperTextContainer,
  StyledHelperText,
  StyledInputWrapper,
  StyledInputPlaceholder,
  StyledInputClearButton as InputClearButton,
  StyledInputBlockLabel as InputBlockLabel,
  StyledInputLabel as InputLabel,
  StyledInputContent as InputContent
} from './input.styles';
import ClearIcon from '../utils/clear-icon';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;
export type InputProps = Props &
  typeof defaultProps &
  NativeAttrs & { css?: CSS };

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
      color,
      helperColor,
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
      borderWeight,
      disabled,
      bordered,
      underlined,
      rounded,
      css,
      ...props
    },
    ref: React.Ref<FormElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => inputRef.current);

    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const [hover, setHover] = useState<boolean>(false);

    const { isDark } = useTheme();

    const isControlledComponent = useMemo(() => value !== undefined, [value]);

    const inputLabel = useMemo(
      () => label || labelPlaceholder,
      [label, labelPlaceholder]
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

    const changeHandler = (event: React.ChangeEvent<FormElement>) => {
      if (disabled || readOnly) return;
      setSelfValue(event.target.value);
      onChange && onChange(event);
    };

    const clearHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();

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

    const { labelProps, fieldProps } = useLabel({
      ...inputProps,
      label: inputLabel
    });

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
      <StyledInputMainContainer
        color={color}
        data-state={getState}
        helperColor={helperColor}
        borderWeight={borderWeight}
        status={status}
        size={size}
        rounded={rounded}
        disabled={disabled}
        css={{
          width,
          ...(css as any)
        }}
        className={clsx(
          `${preClass}-main-container`,
          `${preClass}-main-container--${getState}`
        )}
      >
        {inputLabel && (
          <InputBlockLabel
            id={labelProps.id}
            className={`${preClass}-block-label`}
            htmlFor={labelProps.htmlFor}
            isTextarea={isTextarea}
            underlined={underlined}
            animated={animated}
            bordered={bordered}
            rounded={rounded}
            hasContentLeft={!!contentLeft}
            withValue={!!selfValue}
            asPlaceholder={!!labelPlaceholder}
            focused={hover}
          >
            {inputLabel}
          </InputBlockLabel>
        )}
        <StyledInputContainer
          animated={animated}
          isTextarea={isTextarea}
          underlined={underlined}
          isReadOnly={readOnly}
          focused={hover}
          className={clsx(
            `${preClass}-container`,
            `${preClass}-container--${getState}`,
            {
              [`${preClass}-container--input`]: !isTextarea,
              [`${preClass}-container--textarea`]: isTextarea,
              [`${preClass}-container--read-only`]: readOnly
            },
            className
          )}
        >
          <StyledInputWrapper
            as={inputLabel ? 'div' : 'label'}
            animated={animated}
            bordered={bordered}
            shadow={shadow}
            disabled={disabled}
            focused={hover}
            isReadOnly={readOnly}
            underlined={underlined}
            isTextarea={isTextarea}
            className={clsx(
              `${preClass}-wrapper`,
              `${preClass}-wrapper--${getState}`,
              {
                [`${preClass}-wrapper--bordered`]: bordered,
                [`${preClass}-wrapper--underlined`]: underlined,
                [`${preClass}-wrapper--shadow`]: shadow
              }
            )}
          >
            {!inputLabel && placeholder && (
              <StyledInputPlaceholder className={`${preClass}-placeholder`}>
                {placeholder}
              </StyledInputPlaceholder>
            )}
            {labelLeft && (
              <InputLabel
                className={`${preClass}-label--left`}
                isDefaultStatus={status === 'default'}
                underlined={underlined}
                bordered={bordered}
                isDark={isDark}
              >
                {labelLeft}
              </InputLabel>
            )}
            {contentLeft && (
              <InputContent
                className={clsx(
                  `${preClass}-content`,
                  `${preClass}-content--left`
                )}
                applyStyles={contentLeftStyling}
                clickable={contentClickable}
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  contentClickHandler('left', e)
                }
              >
                {contentLeft}
              </InputContent>
            )}
            <StyledInput
              type="text"
              as={Component}
              ref={inputRef}
              className={clsx({
                [`${preClass}`]: !isTextarea,
                [`${preClass}-textarea`]: isTextarea,
                [`${preClass}-disabled`]: disabled,
                [`${preClass}-rounded`]: rounded,
                [`${preClass}-${preClass}-right-content`]: contentRight,
                [`${preClass}-left-content`]: contentLeft
              })}
              isTextarea={isTextarea}
              focused={hover}
              bordered={bordered}
              placeholder={inputPlaceholder}
              disabled={disabled}
              readOnly={readOnly}
              onFocus={focusHandler}
              onBlur={blurHandler}
              onChange={changeHandler}
              autoComplete={autoComplete}
              hasLeftContent={!!contentLeft}
              hasRightContent={!!contentRight}
              data-state={getState}
              aria-placeholder={inputPlaceholder}
              aria-readonly={readOnly}
              aria-required={required}
              aria-multiline={isTextarea}
              {...inputProps}
              {...fieldProps}
            />
            {clearable && (
              <InputClearButton
                type="button"
                className={`${preClass}-clear-button`}
                animated={animated}
                underlined={underlined}
                visible={Boolean(selfValue)}
                hasContentRight={!!contentRight}
                disabled={disabled || readOnly}
                onClick={clearHandler}
              >
                <ClearIcon fill="currentColor" />
              </InputClearButton>
            )}
            {contentRight && (
              <InputContent
                className={clsx(
                  `${preClass}-content`,
                  `${preClass}-content--right`
                )}
                applyStyles={contentRightStyling}
                clickable={contentClickable}
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  contentClickHandler('right', e)
                }
              >
                {contentRight}
              </InputContent>
            )}
            {labelRight && (
              <InputLabel
                className={`${preClass}-label--right`}
                isDefaultStatus={status === 'default'}
                underlined={underlined}
                bordered={bordered}
                isRight={true}
                isDark={isDark}
              >
                {labelRight}
              </InputLabel>
            )}
          </StyledInputWrapper>
        </StyledInputContainer>
        <StyledHelperTextContainer
          className={`${preClass}-helper-text-container`}
          withValue={!!helperText}
        >
          {helperText && (
            <StyledHelperText className={`${preClass}-helper-text`}>
              {helperText}
            </StyledHelperText>
          )}
        </StyledHelperTextContainer>
      </StyledInputMainContainer>
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
  NativeAttrs & { css?: CSS };

Input.displayName = 'NextUI - Input';

Input.defaultProps = defaultProps;

Input.toString = () => '.nextui-input';

export default Input as InputComponent<FormElement, ComponentProps>;
