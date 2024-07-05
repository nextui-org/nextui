import type {ComboBoxState} from "@react-stately/combobox";

import React, {ReactNode} from "react";

export interface AriaHiddenInputProps<T> {
  /**
   * Describes the type of autocomplete functionality the input should provide if any.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /** The text label for the select. */
  label?: ReactNode;
  /** HTML form input name. */
  name?: string;
  /** Sets the disabled state of the select and input. */
  isDisabled?: boolean;
  /** Whether the select is required. */
  isRequired?: boolean;
  /** State for the input. */
  state: ComboBoxState<T>;
}

export function HiddenInput<T>(props: AriaHiddenInputProps<T>) {
  const {state, ...otherProps} = props;

  return <input {...otherProps} type="hidden" value={state.selectedKey || ""} />;
}
