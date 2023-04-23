import type {
  TableVariantProps,
  SlotsToClasses,
  TableReturnType,
  TableSlots,
} from "@nextui-org/theme";
import type {SelectionBehavior, DisabledBehavior} from "@react-types/shared";
import type {TableState, TableStateProps} from "@react-stately/table";
import type {TableCollection} from "@react-types/table";

import {ReactNode, Key, useCallback} from "react";
import {useTableState} from "@react-stately/table";
import {AriaTableProps, useTable as useReactAriaTable} from "@react-aria/table";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {table} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"table"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /*
   * The elements that make up the table. Includes the TableHeader, TableBody, Columns, and Rows.
   */
  children?: ReactNode;
  /**
   * A custom wrapper component for the table.
   * @default "div"
   */
  BaseComponent?: React.ComponentType<any>;
  /**
   * A property to include a component in the top of the table.
   */
  topContent?: ReactNode;
  /**
   * A property to include a component in the bottom of the table.
   */
  bottomContent?: ReactNode;
  /**
   * Whether the table base container should not be rendered.
   * @default false
   */
  removeWrapper?: boolean;
  /**
   * How multiple selection should behave in the collection.
   * The selection behavior for the table. If selectionMode is `"none"`, this will be `null`.
   * otherwise, this will be `toggle` or `replace`.
   * @default "toggle"
   */
  selectionBehavior?: SelectionBehavior | null;
  /**
   * Whether `disabledKeys` applies to all interactions, or only selection.
   * @default "selection"
   */
  disabledBehavior?: DisabledBehavior;
  /**
   * Whether to disabled the related animations such as checkbox animation.
   * @default false
   */
  disableAnimation?: boolean;
  /** Handler that is called when a user performs an action on the row. */
  onRowAction?: (key: Key) => void;
  /** Handler that is called when a user performs an action on the cell. */
  onCellAction?: (key: Key) => void;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Table classNames={{
   *    base:"base-classes", // table wrapper
   *    table: "table-classes",
   *    thead: "thead-classes",
   *    tbody: "tbody-classes",
   *    tr: "tr-classes",
   *    th: "th-classes",
   *    td: "td-classes",
   *    tfoot: "tfoot-classes",
   *    sortIcon: "sort-icon-classes",
   *    emptyWrapper: "empty-wrapper-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<TableSlots>;
}

export type UseTableProps<T = object> = Props &
  TableStateProps<T> &
  AriaTableProps<T> &
  TableVariantProps;

export type ContextType<T = object> = {
  state: TableState<T>;
  slots: TableReturnType;
  collection: TableCollection<T>;
  color: TableVariantProps["color"];
  isSelectable: boolean;
  selectionMode: UseTableProps<T>["selectionMode"];
  selectionBehavior: SelectionBehavior | null;
  disabledBehavior: UseTableProps<T>["disabledBehavior"];
  disableAnimation?: UseTableProps<T>["disableAnimation"];
  showSelectionCheckboxes: UseTableProps<T>["showSelectionCheckboxes"];
  classNames?: SlotsToClasses<TableSlots>;
  onRowAction?: UseTableProps<T>["onRowAction"];
  onCellAction?: UseTableProps<T>["onCellAction"];
};

export function useTable<T extends object>(originalProps: UseTableProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, table.variantKeys);

  const {
    ref,
    as,
    children,
    className,
    classNames,
    removeWrapper = false,
    selectionMode = "none",
    selectionBehavior = selectionMode === "none" ? null : "toggle",
    disabledBehavior = "selection",
    showSelectionCheckboxes = selectionMode === "multiple" && selectionBehavior !== "replace",
    disableAnimation = false,
    BaseComponent = "div",
    topContent,
    bottomContent,
    onRowAction,
    onCellAction,
    ...otherProps
  } = props;

  const Component = as || "table";

  const domRef = useDOMRef(ref);

  const state = useTableState({
    ...originalProps,
    children,
    showSelectionCheckboxes,
  });

  const {collection} = state;

  const {gridProps} = useReactAriaTable<T>(originalProps, state, domRef);

  const isSelectable = selectionMode !== "none";
  const isMultiSelectable = selectionMode === "multiple";

  const slots = useMemo(
    () =>
      table({
        ...variantProps,
        isSelectable,
        isMultiSelectable,
      }),
    [...Object.values(variantProps), isSelectable, isMultiSelectable],
  );

  const baseStyles = clsx(className, classNames?.base);

  const context = useMemo<ContextType<T>>(
    () => ({
      state,
      slots,
      isSelectable,
      color: originalProps?.color,
      collection,
      classNames,
      disableAnimation,
      selectionMode,
      selectionBehavior,
      disabledBehavior,
      showSelectionCheckboxes,
      onRowAction,
      onCellAction,
    }),
    [
      slots,
      state,
      collection,
      isSelectable,
      disableAnimation,
      originalProps?.color,
      classNames,
      selectionMode,
      selectionBehavior,
      disabledBehavior,
      showSelectionCheckboxes,
      onRowAction,
      onCellAction,
    ],
  );

  const getBaseProps: PropGetter = useCallback(
    (props) => ({
      ...props,
      className: slots.base({class: clsx(baseStyles, props?.className)}),
    }),
    [baseStyles, slots],
  );

  const getTableProps: PropGetter = (props) => ({
    ...mergeProps(gridProps, filterDOMProps(otherProps, {labelable: true}), props),
    ref: domRef,
    className: slots.table({class: clsx(classNames?.table, props?.className)}),
  });

  return {
    BaseComponent,
    Component,
    children,
    state,
    collection,
    context,
    topContent,
    bottomContent,
    removeWrapper,
    selectionMode,
    getBaseProps,
    getTableProps,
  };
}

export type UseTableReturn = ReturnType<typeof useTable>;
