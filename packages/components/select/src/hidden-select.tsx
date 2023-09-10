/**
 * Based on @react-aria/select with some modifications to support required attribute and
 * custom input/select props.
 */
import {FocusableElement} from "@react-types/shared";
import React, {ReactNode, RefObject} from "react";
import {useFormReset} from "@react-aria/utils";
import {useInteractionModality} from "@react-aria/interactions";
import {useVisuallyHidden} from "@react-aria/visually-hidden";
import {MultiSelectProps, MultiSelectState} from "@nextui-org/use-aria-multiselect";

export interface AriaHiddenSelectProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
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
}

type NativeHTMLSelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  keyof AriaHiddenSelectProps
>;

type CombinedAriaSelectProps = NativeHTMLSelectProps & AriaHiddenSelectProps;

export interface HiddenSelectProps<T> extends CombinedAriaSelectProps {
  /** State for the select. */
  state: MultiSelectState<T>;
  /** The selection mode for the select. */
  selectionMode: MultiSelectProps<T>["selectionMode"];
  /** A ref to the trigger element. */
  triggerRef: RefObject<FocusableElement>;
  /** A ref to the hidden `<select>` element. */
  selectRef?: RefObject<HTMLSelectElement>;
}

export interface AriaHiddenSelectOptions<T> extends CombinedAriaSelectProps {
  /** A ref to the hidden `<select>` element. */
  selectRef?: RefObject<HTMLSelectElement>;
  /** The selection mode for the select. */
  selectionMode: MultiSelectProps<T>["selectionMode"];
}

/**
 * Provides the behavior and accessibility implementation for a hidden `<select>` element, which
 * can be used in combination with `useSelect` to support browser form autofill, mobile form
 * navigation, and native HTML form submission.
 */
export function useHiddenSelect<T>(
  props: AriaHiddenSelectOptions<T>,
  state: MultiSelectState<T>,
  triggerRef: RefObject<FocusableElement>,
) {
  let {autoComplete, name, isDisabled, isRequired, selectionMode, onChange} = props;
  let modality = useInteractionModality();
  let {visuallyHiddenProps} = useVisuallyHidden();

  // @ts-ignore
  useFormReset(props.selectRef, state.selectedKey, state.setSelectedKey);

  return {
    containerProps: {
      ...visuallyHiddenProps,
      "aria-hidden": true,
      ["data-a11y-ignore"]: "aria-hidden-focus",
    },
    inputProps: {
      type: "text",
      tabIndex: modality == null || state.isFocused || state.isOpen ? -1 : 0,
      autoComplete,
      value: [...state.selectedKeys].join(",") ?? "",
      required: isRequired,
      style: {fontSize: 16},
      onFocus: () => triggerRef.current?.focus(),
      disabled: isDisabled,
      // The onChange is handled by the `select` element. This avoids the `form` with input `value`
      // and no `onChange` warning.
      onChange: () => {},
    },
    selectProps: {
      name,
      tabIndex: -1,
      autoComplete,
      disabled: isDisabled,
      size: state.collection.size,
      value:
        selectionMode === "multiple"
          ? [...state.selectedKeys].map((k) => String(k))
          : [...state.selectedKeys][0],
      multiple: selectionMode === "multiple",
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
        state.setSelectedKeys(e.target.value);
        onChange?.(e);
      },
    },
  };
}

/**
 * Renders a hidden native `<select>` element, which can be used to support browser
 * form autofill, mobile form navigation, and native form submission.
 */
export function HiddenSelect<T>(props: HiddenSelectProps<T>) {
  let {state, triggerRef, selectRef, label, name, isDisabled} = props;

  let {containerProps, inputProps, selectProps} = useHiddenSelect(
    {...props, selectRef},
    state,
    triggerRef,
  );

  // If used in a <form>, use a hidden input so the value can be submitted to a server.
  // If the collection isn't too big, use a hidden <select> element for this so that browser
  // autofill will work. Otherwise, use an <input type="hidden">.
  if (state.collection.size <= 300) {
    return (
      <div {...containerProps} data-testid="hidden-select-container">
        <input {...inputProps} />
        <label>
          {label}
          <select {...selectProps} ref={selectRef}>
            <option />
            {[...state.collection.getKeys()].map((key) => {
              let item = state.collection.getItem(key);

              if (item?.type === "item") {
                return (
                  <option key={item.key} value={item.key}>
                    {item.textValue}
                  </option>
                );
              }
            })}
          </select>
        </label>
      </div>
    );
  } else if (name) {
    return (
      <input
        autoComplete={selectProps.autoComplete}
        disabled={isDisabled}
        name={name}
        type="hidden"
        value={[...state.selectedKeys].join(",") ?? ""}
      />
    );
  }

  return null;
}
