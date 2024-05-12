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

export function useMultiSelectState<T extends {}>(props: MultiSelectProps<T>): MultiSelectState<T> {
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

  const validationState = useFormValidationState({
    ...props,
    // @ts-ignore
    value: listState.selectedKeys,
  });

  return {
    ...validationState,
    ...listState,
    ...triggerState,
    focusStrategy: focusStrategy as FocusStrategy,
    close() {
      triggerState.close();
    },
    open(focusStrategy: FocusStrategy | null = null) {
      // Don't open if the collection is empty.
      if (listState.collection.size !== 0) {
        setFocusStrategy(focusStrategy);
        triggerState.open();
      }
    },
    toggle(focusStrategy: FocusStrategy | null = null) {
      if (listState.collection.size !== 0) {
        setFocusStrategy(focusStrategy);
        triggerState.toggle();
        validationState.commitValidation();
      }
    },
    isFocused,
    setFocused,
  };
}
