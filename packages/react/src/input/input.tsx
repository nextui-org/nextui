import type {CSS} from "../theme/stitches.config";

import React, {
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {useLabel} from "@react-aria/label";
import {useFocusRing} from "@react-aria/focus";

import {ContentPosition} from "../utils/prop-types";
import useTheme from "../use-theme";
import {warn} from "../utils/console";
import ClearIcon from "../utils/clear-icon";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {
  StyledInput,
  StyledInputMainContainer,
  StyledInputContainer,
  StyledHelperTextContainer,
  StyledHelperText,
  StyledInputWrapper,
  StyledInputPlaceholder,
  StyledInputClearButtonIconWrapper as InputClearButtonIconWrapper,
  StyledInputClearButton as InputClearButton,
  StyledInputBlockLabel as InputBlockLabel,
  StyledInputLabel as InputLabel,
  StyledInputContent as InputContent,
} from "./input.styles";
import {Props, FormElement, defaultProps} from "./input-props";
import InputPassword from "./input-password";

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;
export type InputProps = Props & typeof defaultProps & NativeAttrs & {css?: CSS};

const simulateChangeEvent = (
  el: FormElement,
  event: React.MouseEvent<HTMLButtonElement>,
): React.ChangeEvent<FormElement> => {
  return {
    ...event,
    target: el,
    currentTarget: el,
  };
};

const preClass = "nextui-input";

const Input = React.forwardRef<FormElement, InputProps>(
  (
    {
      as: Component = "input",
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
    ref: React.Ref<FormElement | null>,
  ) => {
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => inputRef.current);

    const [selfValue, setSelfValue] = useState<string>(initialValue);
    const [hover, setHover] = useState<boolean>(false);

    const {isDark} = useTheme();

    const isControlledComponent = useMemo(() => value !== undefined, [value]);

    const inputLabel = useMemo(() => label || labelPlaceholder, [label, labelPlaceholder]);

    const inputPlaceholder = useMemo(
      () => (labelPlaceholder ? "" : placeholder),
      [placeholder, labelPlaceholder],
    );

    const width = useMemo(() => {
      if (fullWidth) return "100%";
      if (widthProp) return widthProp;

      return "initial";
    }, [fullWidth, widthProp]);

    if (underlined && __DEV__) {
      bordered && warn("Using underlined and bordered at the same time will have no effect.");
      rounded && warn("Using underlined and rounded at the same time will have no effect.");
    }

    const changeHandler = (event: React.ChangeEvent<FormElement>) => {
      if (disabled || readOnly) return;
      isControlledComponent || setSelfValue(event.target.value);
      onChange && onChange(event);
    };

    const clearHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();

      isControlledComponent || setSelfValue("");
      onClearClick && onClearClick(event);
      /* istanbul ignore next */
      if (!inputRef.current) return;

      const changeEvent = simulateChangeEvent(inputRef.current, event);

      changeEvent.target.value = "";
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

    const contentClickHandler = (key: ContentPosition, e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onContentClick && onContentClick(key, e);
    };

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string);
      }
    }, [isControlledComponent, value]);

    const isTextarea = useMemo(() => Component === "textarea", [Component]);

    const controlledValue = isControlledComponent
      ? {value: selfValue}
      : {defaultValue: initialValue};

    const inputProps = {
      ...props,
      ...controlledValue,
    };

    const {
      isFocusVisible: isClearButtonFocusVisible,
      focusProps: clearButtonFocusVisibleFocusProps,
    } = useFocusRing();

    const {labelProps, fieldProps} = useLabel({
      ...inputProps,
      label: inputLabel,
    });

    const getState = useMemo(() => {
      return hover
        ? "hover"
        : disabled
        ? "disabled"
        : readOnly
        ? "read-only"
        : selfValue
        ? "with-value"
        : "normal";
    }, [hover, disabled, readOnly, selfValue]);

    return (
      <StyledInputMainContainer
        borderWeight={borderWeight}
        className={clsx(`${preClass}-main-container`, `${preClass}-main-container--${getState}`)}
        color={color}
        css={{width, ...css}}
        data-state={getState}
        disabled={disabled}
        helperColor={helperColor}
        rounded={rounded}
        size={size}
        status={status}
      >
        {inputLabel && (
          <InputBlockLabel
            animated={animated}
            asPlaceholder={!!labelPlaceholder}
            bordered={bordered}
            className={`${preClass}-block-label`}
            focused={hover}
            hasContentLeft={!!contentLeft}
            htmlFor={"htmlFor" in labelProps ? labelProps.htmlFor : ""}
            id={labelProps.id}
            isTextarea={isTextarea}
            rounded={rounded}
            underlined={underlined}
            withValue={!!selfValue}
          >
            {inputLabel}
          </InputBlockLabel>
        )}
        <StyledInputContainer
          animated={animated}
          className={clsx(
            `${preClass}-container`,
            `${preClass}-container--${getState}`,
            {
              [`${preClass}-container--input`]: !isTextarea,
              [`${preClass}-container--textarea`]: isTextarea,
              [`${preClass}-container--read-only`]: readOnly,
            },
            className,
          )}
          focused={hover}
          isReadOnly={readOnly}
          isTextarea={isTextarea}
          underlined={underlined}
        >
          <StyledInputWrapper
            animated={animated}
            as={inputLabel ? "div" : "label"}
            bordered={bordered}
            className={clsx(`${preClass}-wrapper`, `${preClass}-wrapper--${getState}`, {
              [`${preClass}-wrapper--bordered`]: bordered,
              [`${preClass}-wrapper--underlined`]: underlined,
              [`${preClass}-wrapper--shadow`]: shadow,
            })}
            disabled={disabled}
            focused={hover}
            isReadOnly={readOnly}
            isTextarea={isTextarea}
            shadow={shadow}
            underlined={underlined}
          >
            {!inputLabel && placeholder && (
              <StyledInputPlaceholder className={`${preClass}-placeholder`}>
                {placeholder}
              </StyledInputPlaceholder>
            )}
            {labelLeft && (
              <InputLabel
                bordered={bordered}
                className={`${preClass}-label--left`}
                isDark={isDark}
                isDefaultStatus={status === "default"}
                underlined={underlined}
              >
                {labelLeft}
              </InputLabel>
            )}
            {contentLeft && (
              <InputContent
                applyStyles={contentLeftStyling}
                className={clsx(`${preClass}-content`, `${preClass}-content--left`)}
                clickable={contentClickable}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => contentClickHandler("left", e)}
              >
                {contentLeft}
              </InputContent>
            )}
            <StyledInput
              ref={inputRef}
              aria-multiline={isTextarea}
              aria-placeholder={inputPlaceholder}
              aria-readonly={readOnly}
              aria-required={required}
              as={Component}
              autoComplete={autoComplete}
              bordered={bordered}
              className={clsx({
                [`${preClass}`]: !isTextarea,
                [`${preClass}-textarea`]: isTextarea,
                [`${preClass}-disabled`]: disabled,
                [`${preClass}-rounded`]: rounded,
                [`${preClass}-${preClass}-right-content`]: contentRight,
                [`${preClass}-left-content`]: contentLeft,
              })}
              data-state={getState}
              disabled={disabled}
              focused={hover}
              hasLeftContent={!!contentLeft}
              hasRightContent={!!contentRight}
              isTextarea={isTextarea}
              placeholder={inputPlaceholder}
              readOnly={readOnly}
              required={required}
              type="text"
              onBlur={blurHandler}
              onChange={changeHandler}
              onFocus={focusHandler}
              {...inputProps}
              {...fieldProps}
            />
            {clearable && (
              <InputClearButton
                animated={animated}
                aria-label="clear"
                className={`${preClass}-clear-button`}
                disabled={disabled || readOnly}
                hasContentRight={!!contentRight}
                lang="en"
                type="button"
                underlined={underlined}
                visible={Boolean(selfValue)}
                onClick={clearHandler}
                {...clearButtonFocusVisibleFocusProps}
              >
                <InputClearButtonIconWrapper isFocusVisible={isClearButtonFocusVisible}>
                  <ClearIcon fill="currentColor" />
                </InputClearButtonIconWrapper>
              </InputClearButton>
            )}
            {contentRight && (
              <InputContent
                applyStyles={contentRightStyling}
                className={clsx(`${preClass}-content`, `${preClass}-content--right`)}
                clickable={contentClickable}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => contentClickHandler("right", e)}
              >
                {contentRight}
              </InputContent>
            )}
            {labelRight && (
              <InputLabel
                bordered={bordered}
                className={`${preClass}-label--right`}
                isDark={isDark}
                isDefaultStatus={status === "default"}
                isRight={true}
                underlined={underlined}
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
            <StyledHelperText className={`${preClass}-helper-text`}>{helperText}</StyledHelperText>
          )}
        </StyledHelperTextContainer>
      </StyledInputMainContainer>
    );
  },
);

type InputComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Password: typeof InputPassword;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs & {css?: CSS};

Input.displayName = "NextUI.Input";

Input.defaultProps = defaultProps;

Input.toString = () => ".nextui-input";

export default Input as InputComponent<FormElement, ComponentProps>;
