// based on @react-aria/use-textfield hook, but with useId from react 18
// thanks to @adobe/react-spectrum for the great work ❤️

import {AriaTextFieldProps} from "@react-types/textfield";
import {
  ChangeEvent,
  DOMFactory,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactDOM,
  RefObject,
} from "react";
import {DOMAttributes} from "@react-types/shared";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {useAriaField} from "@nextui-org/use-aria-field";
import {useFocusable} from "@react-aria/focus";

/**
 * A map of HTML element names and their interface types.
 * For example `'a'` -> `HTMLAnchorElement`.
 */
type IntrinsicHTMLElements = {
  [K in keyof IntrinsicHTMLAttributes]: IntrinsicHTMLAttributes[K] extends HTMLAttributes<infer T>
    ? T
    : never;
};

/**
 * A map of HTML element names and their attribute interface types.
 * For example `'a'` -> `AnchorHTMLAttributes<HTMLAnchorElement>`.
 */
type IntrinsicHTMLAttributes = {
  [K in keyof ReactDOM]: ReactDOM[K] extends DOMFactory<infer T, any> ? T : never;
};

type DefaultElementType = "input";

/**
 * The intrinsic HTML element names that `useTextField` supports; e.g. `input`,
 * `textarea`.
 */
type TextFieldIntrinsicElements = keyof Pick<IntrinsicHTMLElements, "input" | "textarea">;

/**
 * The HTML element interfaces that `useTextField` supports based on what is
 * defined for `TextFieldIntrinsicElements`; e.g. `HTMLInputElement`,
 * `HTMLTextAreaElement`.
 */
type TextFieldHTMLElementType = Pick<IntrinsicHTMLElements, TextFieldIntrinsicElements>;

/**
 * The HTML attributes interfaces that `useTextField` supports based on what
 * is defined for `TextFieldIntrinsicElements`; e.g. `InputHTMLAttributes`,
 * `TextareaHTMLAttributes`.
 */
type TextFieldHTMLAttributesType = Pick<IntrinsicHTMLAttributes, TextFieldIntrinsicElements>;

/**
 * The type of `inputProps` returned by `useTextField`; e.g. `InputHTMLAttributes`,
 * `TextareaHTMLAttributes`.
 */
type TextFieldInputProps<T extends TextFieldIntrinsicElements> = TextFieldHTMLAttributesType[T];

export interface AriaTextFieldOptions<T extends TextFieldIntrinsicElements>
  extends AriaTextFieldProps {
  /**
   * The HTML element used to render the input, e.g. 'input', or 'textarea'.
   * It determines whether certain HTML attributes will be included in `inputProps`.
   * For example, [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type).
   * @default 'input'
   */
  inputElementType?: T;
}

/**
 * The type of `ref` object that can be passed to `useTextField` based on the given
 * intrinsic HTML element name; e.g.`RefObject<HTMLInputElement>`,
 * `RefObject<HTMLTextAreaElement>`.
 */
type TextFieldRefObject<T extends TextFieldIntrinsicElements> = RefObject<
  TextFieldHTMLElementType[T]
>;

export interface TextFieldAria<T extends TextFieldIntrinsicElements = DefaultElementType> {
  /** Props for the input element. */
  inputProps: TextFieldInputProps<T>;
  /** Props for the text field's visible label element, if any. */
  labelProps: DOMAttributes | LabelHTMLAttributes<HTMLLabelElement>;
  /** Props for the text field's description element, if any. */
  descriptionProps: DOMAttributes;
  /** Props for the text field's error message element, if any. */
  errorMessageProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a text field.
 * @param props - Props for the text field.
 * @param ref - Ref to the HTML input or textarea element.
 */
export function useAriaTextField<T extends TextFieldIntrinsicElements = DefaultElementType>(
  props: AriaTextFieldOptions<T>,
  ref: TextFieldRefObject<T>,
): TextFieldAria<T> {
  let {
    inputElementType = "input",
    isDisabled = false,
    isRequired = false,
    isReadOnly = false,
    validationState,
    type = "text",
    onChange = () => {},
  }: AriaTextFieldOptions<TextFieldIntrinsicElements> = props;
  let {focusableProps} = useFocusable(props, ref);
  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useAriaField(props);
  let domProps = filterDOMProps(props, {labelable: true});

  const inputOnlyProps = {
    type,
    pattern: props.pattern,
  };

  return {
    labelProps,
    // @ts-ignore
    inputProps: mergeProps(domProps, inputElementType === "input" && inputOnlyProps, {
      disabled: isDisabled,
      readOnly: isReadOnly,
      "aria-required": isRequired || undefined,
      "aria-invalid": validationState === "invalid" || undefined,
      "aria-errormessage": props["aria-errormessage"],
      "aria-activedescendant": props["aria-activedescendant"],
      "aria-autocomplete": props["aria-autocomplete"],
      "aria-haspopup": props["aria-haspopup"],
      value: props.value,
      defaultValue: props.value ? undefined : props.defaultValue,
      onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
      autoComplete: props.autoComplete,
      maxLength: props.maxLength,
      minLength: props.minLength,
      name: props.name,
      placeholder: props.placeholder,
      inputMode: props.inputMode,

      // Clipboard events
      onCopy: props.onCopy,
      onCut: props.onCut,
      onPaste: props.onPaste,

      // Composition events
      onCompositionEnd: props.onCompositionEnd,
      onCompositionStart: props.onCompositionStart,
      onCompositionUpdate: props.onCompositionUpdate,

      // Selection events
      onSelect: props.onSelect,

      // Input events
      onBeforeInput: props.onBeforeInput,
      onInput: props.onInput,
      ...focusableProps,
      ...fieldProps,
    }),
    descriptionProps,
    errorMessageProps,
  };
}
