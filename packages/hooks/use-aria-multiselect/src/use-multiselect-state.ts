import type {OverlayTriggerProps} from "@react-types/overlays";
import type {
  AsyncLoadable,
  CollectionBase,
  DOMProps,
  FocusStrategy,
  FocusableProps,
  HelpTextProps,
  InputBase,
  LabelableProps,
  MultipleSelection,
  TextInputBase,
  Validation,
  ValidationError,
} from "@react-types/shared";

import {MenuTriggerState, useMenuTriggerState} from "@react-stately/menu";
import {FormValidationState, useFormValidationState} from "@react-stately/form";
import {useState} from "react";

import {MultiSelectListState, useMultiSelectListState} from "./use-multiselect-list-state";

export interface MultiSelectProps<T>
  extends CollectionBase<T>,
    AsyncLoadable,
    Omit<InputBase, "isReadOnly">,
    DOMProps,
    HelpTextProps,
    Omit<Validation<T>, "validate">,
    LabelableProps,
    TextInputBase,
    Omit<MultipleSelection, "none">,
    FocusableProps,
    OverlayTriggerProps {
  /**
   * Whether the menu should automatically flip direction when space is limited.
   * @default true
   */
  shouldFlip?: boolean;
  /**
   * A function that returns an error message if a given value is invalid.
   * Validation errors are displayed to the user when the form is submitted
   * if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
   * prop instead.
   */
  validate?: (value: string | string[]) => ValidationError | true | null | undefined;
  /**
   * Whether the menu should be hidden when there are no items.
   */
  hideEmptyContent?: boolean;
}

export interface MultiSelectState<T>
  extends MultiSelectListState<T>,
    MenuTriggerState,
    FormValidationState {
  /** Whether the select is currently focused. */
  isFocused: boolean;
  /** Sets whether the select is focused. */
  setFocused(isFocused: boolean): void;
}

export function useMultiSelectState<T extends object>({
  validate,
  validationBehavior,
  ...props
}: MultiSelectProps<T>): MultiSelectState<T> {
  const [isFocused, setFocused] = useState(false);
  const [focusStrategy, setFocusStrategy] = useState<FocusStrategy | null>(null);

  const triggerState = useMenuTriggerState(props);

  const listState = useMultiSelectListState({
    ...props,
    onSelectionChange: (keys) => {
      if (props.onSelectionChange != null) {
        if (keys === "all") {
          // This may change back to "all" once we will implement async loading of additional
          // items and differentiation between "select all" vs. "select visible".
          props.onSelectionChange(new Set(listState.collection.getKeys()));
        } else {
          props.onSelectionChange(keys);
        }
      }

      // Multi select stays open after item selection
      if (props.selectionMode === "single") {
        triggerState.close();
      }
    },
  });

  const validationState = useFormValidationState<Set<string>>({
    ...props,
    validationBehavior,
    validate: (value) => {
      if (!validate) return;
      const keys = Array.from(value as Set<string>);

      return validate(props.selectionMode === "single" ? keys[0] : keys);
    },
    // @ts-ignore
    value: listState.selectedKeys,
  });

  const shouldHideContent = listState.collection.size === 0 && props.hideEmptyContent;

  return {
    ...validationState,
    ...listState,
    ...triggerState,
    focusStrategy: focusStrategy as FocusStrategy,
    close() {
      triggerState.close();
    },
    open(focusStrategy: FocusStrategy | null = null) {
      if (shouldHideContent) return;

      setFocusStrategy(focusStrategy);
      triggerState.open();
    },
    toggle(focusStrategy: FocusStrategy | null = null) {
      if (shouldHideContent) return;

      setFocusStrategy(focusStrategy);
      triggerState.toggle();
    },
    isFocused,
    setFocused,
  };
}
