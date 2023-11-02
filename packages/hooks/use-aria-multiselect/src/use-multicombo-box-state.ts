import {
  Collection,
  CollectionStateBase,
  FocusStrategy,
  Node,
  MultipleSelection,
  CollectionChildren,
} from "@react-types/shared";
import {ComboBoxProps, MenuTriggerAction} from "@react-types/combobox";
import {getChildNodes} from "@react-stately/collections";
import {ListCollection} from "@react-stately/list";
import {SelectState} from "@react-stately/select";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useControlledState} from "@react-stately/utils";
import {useMenuTriggerState} from "@react-stately/menu";

import {useMultiSelectListState} from "./use-multiselect-list-state";

type SingleSelectionKeys =
  | "selectedKey"
  | "defaultSelectedKey"
  | "onSelectionChange"
  | keyof MultipleSelection;

export interface ComboBoxState<T>
  extends Omit<SelectState<T>, SingleSelectionKeys>,
    MultipleSelection {
  /** The current value of the combo box input. */
  inputValue: string;
  /** Sets the value of the combo box input. */
  setInputValue(value: string): void;
  /** Selects the currently focused item and updates the input value. */
  commit(): void;
  /** Opens the menu. */
  open(focusStrategy?: FocusStrategy | null, trigger?: MenuTriggerAction): void;
  /** Toggles the menu. */
  toggle(focusStrategy?: FocusStrategy | null, trigger?: MenuTriggerAction): void;
  /** Resets the input value to the previously selected item's text if any and closes the menu.  */
  revert(): void;
}

type FilterFn = (textValue: string, inputValue: string) => boolean;

export interface ComboBoxStateOptions<T>
  extends Omit<ComboBoxProps<T>, "children" | SingleSelectionKeys>,
    CollectionStateBase<T>,
    MultipleSelection {
  /** The contents of the collection. */
  children: CollectionChildren<T>;
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: FilterFn;
  /** Whether the combo box allows the menu to be open when the collection is empty. */
  allowsEmptyCollection?: boolean;
  /** Whether the combo box menu should close on blur. */
  shouldCloseOnBlur?: boolean;
  /** Whether the combo box allows multiple selection. */
  selectionMode?: "single" | "multiple";
}

/**
 * Provides state management for a combo box component. Handles building a collection
 * of items from props and manages the option selection state of the combo box. In addition, it tracks the input value,
 * focus state, and other properties of the combo box.
 */
export function useMultiComboBoxState<T extends object>(
  props: ComboBoxStateOptions<T>,
): ComboBoxState<T> {
  let {
    defaultFilter,
    menuTrigger = "input",
    allowsEmptyCollection = false,
    allowsCustomValue,
    shouldCloseOnBlur = true,
    selectionMode = "single",
  } = props;

  let [showAllItems, setShowAllItems] = useState(false);
  let [isFocused, setFocusedState] = useState(false);

  let {collection, selectionManager, selectedKeys, setSelectedKeys, selectedItems, disabledKeys} =
    useMultiSelectListState({
      ...props,
      onSelectionChange: (keys) => {
        if (props.onSelectionChange) {
          props.onSelectionChange(keys);
        }

        // If key is the same, reset the inputValue and close the menu
        // (scenario: user clicks on already selected option)
        if (keys !== "all" && keys.size === 0) {
          resetInputValue();
          closeMenu();
        }
      },
      selectionMode,
      items: props.items ?? props.defaultItems,
    });

  let [inputValue, setInputValue] = useControlledState<string>(
    props.inputValue,
    props.defaultInputValue ?? "",
    props.onInputChange,
  );

  // Preserve original collection so we can show all items on demand
  let originalCollection = collection;
  let filteredCollection = useMemo(
    () =>
      // No default filter if items are controlled.
      props.items != null || !defaultFilter
        ? collection
        : filterCollection(collection, inputValue, defaultFilter),
    [collection, inputValue, defaultFilter, props.items],
  );
  let [lastCollection, setLastCollection] = useState(filteredCollection);

  // Track what action is attempting to open the menu
  let menuOpenTrigger = useRef<MenuTriggerAction>("focus");
  let onOpenChange = (open: boolean) => {
    if (props.onOpenChange) {
      props.onOpenChange(open, open ? menuOpenTrigger.current : undefined);
    }

    selectionManager.setFocused(open);
    if (!open) {
      selectionManager.setFocusedKey(null);
    }
  };

  let triggerState = useMenuTriggerState({
    ...props,
    onOpenChange,
    isOpen: undefined,
    defaultOpen: undefined,
  });
  let open = (focusStrategy?: FocusStrategy | null, trigger?: MenuTriggerAction) => {
    let displayAllItems = trigger === "manual" || (trigger === "focus" && menuTrigger === "focus");

    // Prevent open operations from triggering if there is nothing to display
    // Also prevent open operations from triggering if items are uncontrolled but defaultItems is empty, even if displayAllItems is true.
    // This is to prevent comboboxes with empty defaultItems from opening but allow controlled items comboboxes to open even if the inital list is empty (assumption is user will provide swap the empty list with a base list via onOpenChange returning `menuTrigger` manual)
    if (
      allowsEmptyCollection ||
      filteredCollection.size > 0 ||
      (displayAllItems && originalCollection.size > 0) ||
      props.items
    ) {
      if (displayAllItems && !triggerState.isOpen && props.items === undefined) {
        // Show all items if menu is manually opened. Only care about this if items are undefined
        setShowAllItems(true);
      }

      if (trigger) {
        menuOpenTrigger.current = trigger;
      }
      triggerState.open(focusStrategy);
    }
  };

  let toggle = (focusStrategy?: FocusStrategy, trigger?: MenuTriggerAction) => {
    let displayAllItems = trigger === "manual" || (trigger === "focus" && menuTrigger === "focus");

    // If the menu is closed and there is nothing to display, early return so toggle isn't called to prevent extraneous onOpenChange
    if (
      !(
        allowsEmptyCollection ||
        filteredCollection.size > 0 ||
        (displayAllItems && originalCollection.size > 0) ||
        props.items
      ) &&
      !triggerState.isOpen
    ) {
      return;
    }

    if (displayAllItems && !triggerState.isOpen && props.items === undefined) {
      // Show all items if menu is toggled open. Only care about this if items are undefined
      setShowAllItems(true);
    }

    // Only update the menuOpenTrigger if menu is currently closed
    if (!triggerState.isOpen && trigger) {
      menuOpenTrigger.current = trigger;
    }

    focusStrategy && toggleMenu(focusStrategy);
  };

  // If menu is going to close, save the current collection so we can freeze the displayed collection when the
  // user clicks outside the popover to close the menu. Prevents the menu contents from updating as the menu closes.
  let toggleMenu = useCallback(
    (focusStrategy: FocusStrategy) => {
      if (triggerState.isOpen) {
        setLastCollection(filteredCollection);
      }

      triggerState.toggle(focusStrategy);
    },
    [triggerState, filteredCollection],
  );

  let closeMenu = useCallback(() => {
    if (triggerState.isOpen) {
      setLastCollection(filteredCollection);
      triggerState.close();
    }
  }, [triggerState, filteredCollection]);

  let lastValue = useRef(inputValue);
  let resetInputValue = () => {
    // @ts-ignore
    let itemText = collection.getItem(selectedKeys[0])?.textValue ?? "";

    lastValue.current = itemText;
    setInputValue(itemText);
  };

  let lastSelectedKeys = useRef(props.selectedKeys ?? props.defaultSelectedKeys ?? null);
  // @ts-ignore
  let lastSelectedKeyText = useRef(collection.getItem(lastSelectedKeys.current)?.textValue ?? "");

  // intentional omit dependency array, want this to happen on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Open and close menu automatically when the input value changes if the input is focused,
    // and there are items in the collection or allowEmptyCollection is true.
    if (
      isFocused &&
      (filteredCollection.size > 0 || allowsEmptyCollection) &&
      !triggerState.isOpen &&
      inputValue !== lastValue.current &&
      menuTrigger !== "manual"
    ) {
      open(null, "input");
    }

    // Close the menu if the collection is empty. Don't close menu if filtered collection size is 0
    // but we are currently showing all items via button press
    if (
      !showAllItems &&
      !allowsEmptyCollection &&
      triggerState.isOpen &&
      filteredCollection.size === 0
    ) {
      closeMenu();
    }

    // Close when an item is selected.
    if (
      selectedKeys != null &&
      selectedKeys !== lastSelectedKeys.current &&
      selectionMode !== "multiple"
    ) {
      closeMenu();
    }

    // Clear focused key when input value changes and display filtered collection again.
    if (inputValue !== lastValue.current) {
      selectionManager.setFocusedKey(null);
      setShowAllItems(false);

      // Set selectedKeys to null when the user clears the input.
      // If controlled, this is the application developer's responsibility.
      if (
        inputValue === "" &&
        (props.inputValue === undefined || props.selectedKeys === undefined)
      ) {
        // @ts-ignore
        setSelectedKeys(null);
      }
    }

    // If the selectedKeys changed, update the input value.
    // Do nothing if both inputValue and selectedKey are controlled.
    // In this case, it's the user's responsibility to update inputValue in onSelectionChange.
    if (
      selectedKeys != null &&
      props.inputValue === undefined &&
      selectedKeys !== lastSelectedKeys.current
    ) {
      // @ts-ignore
      let itemText = collection.getItem(selectedKeys[0])?.textValue ?? "";

      lastValue.current = itemText;
      setInputValue(itemText);
    }

    // Update the inputValue if the selected item's text changes from its last tracked value.
    // This is to handle cases where a selectedKey is specified but the items aren't available (async loading) or the selected item's text value updates.
    // Only reset if the user isn't currently within the field so we don't erroneously modify user input.
    // If inputValue is controlled, it is the user's responsibility to update the inputValue when items change.
    // @ts-ignore
    let selectedItemText = collection.getItem(selectedKeys)?.textValue ?? "";

    if (
      !isFocused &&
      selectedKeys != null &&
      props.inputValue === undefined &&
      selectedKeys === lastSelectedKeys.current
    ) {
      if (lastSelectedKeyText.current !== selectedItemText) {
        lastValue.current = selectedItemText;
        setInputValue(selectedItemText);
      }
    }

    lastSelectedKeys.current = selectedKeys;
    lastSelectedKeyText.current = selectedItemText;
  });

  // Revert input value and close menu
  let revert = () => {
    if (allowsCustomValue && selectedKeys == null) {
      commitCustomValue();
    } else {
      commitSelection();
    }
  };

  let commitCustomValue = () => {
    lastSelectedKeys.current = null;
    setSelectedKeys([]);
    closeMenu();
  };

  let commitSelection = () => {
    // If multiple things are controlled, call onSelectionChange
    if (props.selectedKeys !== undefined && props.inputValue !== undefined) {
      props.onSelectionChange?.(selectedKeys);

      // Stop menu from reopening from useEffect
      // @ts-ignore
      let itemText = collection.getItem(selectedKeys[0])?.textValue ?? "";

      lastValue.current = itemText;
      closeMenu();
    } else {
      // If only a single aspect of combobox is controlled, reset input value and close menu for the user
      resetInputValue();
      closeMenu();
    }
  };

  const commitValue = () => {
    if (allowsCustomValue) {
      // @ts-ignore
      const itemText = collection.getItem(selectedKeys[0])?.textValue ?? "";

      inputValue === itemText ? commitSelection() : commitCustomValue();
    } else {
      // Reset inputValue and close menu
      commitSelection();
    }
  };

  let commit = () => {
    if (triggerState.isOpen && selectionManager.focusedKey != null) {
      // Reset inputValue and close menu here if the selected key is already the focused key. Otherwise
      // fire onSelectionChange to allow the application to control the closing.
      if (selectedKeys === selectionManager.focusedKey) {
        commitSelection();
      } else {
        setSelectedKeys(selectionManager.focusedKey);
      }
    } else {
      commitValue();
    }
  };

  let setFocused = (isFocused: boolean) => {
    if (isFocused) {
      if (menuTrigger === "focus") {
        open(null, "focus");
      }
    } else if (shouldCloseOnBlur) {
      commitValue();
    }

    setFocusedState(isFocused);
  };

  let displayedCollection = useMemo(() => {
    if (triggerState.isOpen) {
      if (showAllItems) {
        return originalCollection;
      } else {
        return filteredCollection;
      }
    } else {
      return lastCollection;
    }
  }, [triggerState.isOpen, originalCollection, filteredCollection, showAllItems, lastCollection]);

  return {
    ...triggerState,
    toggle,
    open,
    close: commitValue,
    selectionManager,
    selectedKeys,
    setSelectedKeys,
    disabledKeys,
    isFocused,
    setFocused,
    selectedItems,
    collection: displayedCollection,
    inputValue,
    setInputValue,
    commit,
    revert,
  };
}

function filterCollection<T extends object>(
  collection: Collection<Node<T>>,
  inputValue: string,
  filter: FilterFn,
): Collection<Node<T>> {
  return new ListCollection(filterNodes(collection, collection, inputValue, filter));
}

function filterNodes<T>(
  collection: Collection<Node<T>>,
  nodes: Iterable<Node<T>>,
  inputValue: string,
  filter: FilterFn,
): Iterable<Node<T>> {
  let filteredNode = [];

  for (let node of nodes) {
    if (node.type === "section" && node.hasChildNodes) {
      let filtered = filterNodes(collection, getChildNodes(node, collection), inputValue, filter);

      if ([...filtered].some((node) => node.type === "item")) {
        filteredNode.push({...node, childNodes: filtered});
      }
    } else if (node.type === "item" && filter(node.textValue, inputValue)) {
      filteredNode.push({...node});
    } else if (node.type !== "item") {
      filteredNode.push({...node});
    }
  }

  return filteredNode;
}
