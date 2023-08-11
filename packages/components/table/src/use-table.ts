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
import {useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {mergeProps} from "@react-aria/utils";
import {clsx} from "@nextui-org/shared-utils";
import {ReactRef} from "@nextui-org/react-utils";
import {useMemo} from "react";
import {CheckboxProps} from "@nextui-org/checkbox";

type TableContentPlacement = "inside" | "outside";

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
   * Ref to the container element.
   */
  baseRef?: ReactRef<HTMLElement | null>;
  /**
   * Where to place the `topContent` component.
   * @default "inside"
   */
  topContentPlacement?: TableContentPlacement;
  /**
   * Provides content to include a component in the top of the table.
   */
  topContent?: ReactNode;
  /**
   * Where to place the `bottomContent` component.
   * @default "inside"
   */
  bottomContentPlacement?: TableContentPlacement;
  /**
   * Provides content to include a component in the bottom of the table.
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
   * Whether to disable the table and checkbox animations.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Props to be passed to the checkboxes.
   */
  checkboxesProps?: CheckboxProps;
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

export type ValuesType<T = object> = {
  state: TableState<T>;
  slots: TableReturnType;
  collection: TableCollection<T>;
  color: TableVariantProps["color"];
  isSelectable: boolean;
  selectionMode: UseTableProps<T>["selectionMode"];
  selectionBehavior: SelectionBehavior | null;
  checkboxesProps?: CheckboxProps;
  disabledBehavior: UseTableProps<T>["disabledBehavior"];
  disableAnimation?: UseTableProps<T>["disableAnimation"];
  isHeaderSticky?: UseTableProps<T>["isHeaderSticky"];
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
    baseRef,
    children,
    className,
    classNames,
    removeWrapper = false,
    disableAnimation = false,
    selectionMode = "none",
    topContentPlacement = "inside",
    bottomContentPlacement = "inside",
    selectionBehavior = selectionMode === "none" ? null : "toggle",
    disabledBehavior = "selection",
    showSelectionCheckboxes = selectionMode === "multiple" && selectionBehavior !== "replace",
    BaseComponent = "div",
    checkboxesProps,
    topContent,
    bottomContent,
    onRowAction,
    onCellAction,
    ...otherProps
  } = props;

  const Component = as || "table";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);
  const domBaseRef = useDOMRef(baseRef);

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

  const baseStyles = clsx(classNames?.base, className);

  const values = useMemo<ValuesType<T>>(
    () => ({
      state,
      slots,
      isSelectable,
      collection,
      classNames,
      color: originalProps?.color,
      disableAnimation,
      checkboxesProps,
      isHeaderSticky: originalProps?.isHeaderSticky ?? false,
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
      classNames,
      selectionMode,
      selectionBehavior,
      checkboxesProps,
      disabledBehavior,
      disableAnimation,
      showSelectionCheckboxes,
      originalProps?.color,
      originalProps?.isHeaderSticky,
      onRowAction,
      onCellAction,
    ],
  );

  const getBaseProps: PropGetter = useCallback(
    (props) => ({
      ...props,
      ref: domBaseRef,
      className: slots.base({class: clsx(baseStyles, props?.className)}),
    }),
    [baseStyles, slots],
  );

  const getWrapperProps: PropGetter = useCallback(
    (props) => ({
      ...props,
      ref: domBaseRef,
      className: slots.wrapper({class: clsx(classNames?.wrapper, props?.className)}),
    }),
    [classNames?.wrapper, slots],
  );

  const getTableProps: PropGetter = useCallback(
    (props) => ({
      ...mergeProps(
        gridProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        props,
      ),
      ref: domRef,
      className: slots.table({class: clsx(classNames?.table, props?.className)}),
    }),
    [classNames?.table, shouldFilterDOMProps, slots, gridProps, otherProps],
  );

  return {
    BaseComponent,
    Component,
    children,
    state,
    collection,
    values,
    topContent,
    bottomContent,
    removeWrapper,
    topContentPlacement,
    bottomContentPlacement,
    getBaseProps,
    getWrapperProps,
    getTableProps,
  };
}

export type UseTableReturn = ReturnType<typeof useTable>;
