import {ListState, useListState} from "@react-stately/list";
import {CollectionBase, MultipleSelection, AsyncLoadable, Node} from "@react-types/shared";
import {Key, useMemo} from "react";

export interface MultiSelectListProps<T>
  extends CollectionBase<T>,
    AsyncLoadable,
    MultipleSelection {}

export interface MultiSelectListState<T> extends ListState<T> {
  /** The keys for the currently selected items. */
  selectedKeys: Set<Key>;
  /** Sets the selected keys. */
  setSelectedKeys(keys: Iterable<Key>): void;
  /** The value of the currently selected items. */
  selectedItems: Node<T>[] | null;
  /** The type of selection. */
  selectionMode: MultipleSelection["selectionMode"];
}

export function useMultiSelectListState<T extends object>(
  props: MultiSelectListProps<T>,
): MultiSelectListState<T> {
  const {
    collection,
    disabledKeys,
    selectionManager,
    selectionManager: {setSelectedKeys, selectedKeys, selectionMode},
  } = useListState<T>(props);

  const missingKeys: Key[] = useMemo(() => {
    if (!props.isLoading && selectedKeys.size !== 0) {
      return Array.from(selectedKeys)
        .filter(Boolean)
        .filter((key) => !collection.getItem(`${key}`));
    }

    return [];
  }, [selectedKeys, collection]);

  const selectedItems = (
    selectedKeys.size !== 0
      ? Array.from(selectedKeys)
          .map((key) => {
            return collection.getItem(`${key}`);
          })
          // Remove undefined values when some keys are not present in the collection
          .filter(Boolean)
      : null
  ) as Node<T>[] | null;

  if (missingKeys.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `Select: Keys "${missingKeys.join(
        ", ",
      )}" passed to "selectedKeys" are not present in the collection.`,
    );
  }

  return {
    collection,
    disabledKeys,
    selectionManager,
    selectionMode,
    selectedKeys,
    setSelectedKeys: setSelectedKeys.bind(selectionManager),
    selectedItems,
  };
}
