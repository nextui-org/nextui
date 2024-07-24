import type {ComboBoxState} from "@react-stately/combobox";

import React, {ReactNode, RefObject} from "react";
import {useFormReset} from "@react-aria/utils";
import {useFormValidation} from "@react-aria/form";

import {inputData} from "./use-autocomplete";

export interface AriaHiddenInputProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /** The text label for the input. */
  label?: ReactNode;
  /** HTML form input name. */
  name?: string;
  /** Sets the disabled state of the input. */
  isDisabled?: boolean;
  /** Whether the input is required. */
  isRequired?: boolean;
}

type NativeHTMLInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof AriaHiddenInputProps
>;

type CombinedAriaInputProps = NativeHTMLInputProps & AriaHiddenInputProps;

export interface HiddenInputProps<T> extends CombinedAriaInputProps {
  /** State for the input. */
  state: ComboBoxState<T>;
  /** A ref to the hidden `<input>` element. */
  inputRef?: RefObject<HTMLInputElement>;
}

export function useHiddenInput<T>(props: HiddenInputProps<T>) {
  const data = inputData.get(props.state) || {};

  const {
    state,
    autoComplete,
    name = data.name,
    isDisabled = data.isDisabled,
    inputRef,
    onChange,
  } = props;

  const {validationBehavior, isRequired} = data;

  useFormReset(props.inputRef!, state.selectedKey, state.setSelectedKey);
  useFormValidation(
    {
      validationBehavior,
      focus: () => inputRef?.current?.focus(),
    },
    state,
    inputRef,
  );

  return {
    name,
    ref: inputRef,
    type: "hidden",
    disabled: isDisabled,
    required: isRequired,
    autoComplete,
    value: state.selectedKey ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      state.setSelectedKey(e.target.value);
      onChange?.(e);
    },
  };
}

export function HiddenInput<T>(props: HiddenInputProps<T>) {
  const inputProps = useHiddenInput(props);

  return <input {...inputProps} />;
}
