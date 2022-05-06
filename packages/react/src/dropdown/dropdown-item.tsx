import React, { Key, useRef, useMemo } from 'react';
import { Node } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { useHover } from '@react-aria/interactions';
import { useMenuItem } from '@react-aria/menu';
import Text from '../text';
import withDefaults from '../utils/with-defaults';
import { useDropdownContext } from './dropdown-context';
import clsx from '../utils/clsx';

interface Props<T> {
  item: Node<T>;
  state: TreeState<T>;
  isVirtualized?: boolean;
  onAction?: (key: Key) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

const defaultProps = {};

export type DropdownItemProps<T> = Props<T> & NativeAttrs & typeof defaultProps;

const DropdownItem = <T extends object>({
  item,
  state,
  isVirtualized,
  onAction
}: DropdownItemProps<T>) => {
  const { onClose, closeOnSelect } = useDropdownContext();
  const { rendered, key } = item;

  const isSelected = state.selectionManager.isSelected(key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const isDisabled = state.disabledKeys.has(key);

  const ref = useRef<HTMLLIElement>(null);

  const { menuItemProps, labelProps, descriptionProps, keyboardShortcutProps } =
    useMenuItem(
      {
        isSelected,
        isDisabled,
        'aria-label': item['aria-label'],
        key,
        onClose,
        closeOnSelect,
        isVirtualized,
        onAction
      },
      state,
      ref
    );

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const contents =
    typeof rendered === 'string' ? <Text>{rendered}</Text> : rendered;

  const getState = useMemo(() => {
    if (isHovered) return 'hovered';
    if (isSelected) return 'selected';
    return isDisabled ? 'disabled' : 'ready';
  }, [isSelected, isDisabled, isHovered]);

  return (
    <li
      {...mergeProps(menuItemProps, hoverProps)}
      ref={ref}
      data-state={getState}
      style={{
        background: isFocused ? 'gray' : 'transparent',
        color: isFocused ? 'white' : 'transparent',
        padding: '2px 5px',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      className={clsx('nextui-dropdown-item', {
        'is-disabled': isDisabled,
        'is-selected': isSelected,
        'is-selectable': state.selectionManager.selectionMode !== 'none',
        'is-hovered': isHovered
      })}
    >
      {/* <Grid UNSAFE_className={classNames(styles, 'spectrum-Menu-itemGrid')}>
        <ClearSlots>
          <SlotProvider
            slots={{
              text: {
                UNSAFE_className: styles['spectrum-Menu-itemLabel'],
                ...labelProps
              },
              end: {
                UNSAFE_className: styles['spectrum-Menu-end'],
                ...descriptionProps
              },
              icon: {
                UNSAFE_className: styles['spectrum-Menu-icon'],
                size: 'S'
              },
              description: {
                UNSAFE_className: styles['spectrum-Menu-description'],
                ...descriptionProps
              },
              keyboard: {
                UNSAFE_className: styles['spectrum-Menu-keyboard'],
                ...keyboardShortcutProps
              }
            }}
          > */}
      {contents}
      {/* {isSelected && (
              <CheckmarkMedium
                slot="checkmark"
                UNSAFE_className={classNames(styles, 'spectrum-Menu-checkmark')}
              />
            )}
          </SlotProvider>
        </ClearSlots>
      </Grid> */}
    </li>
  );
};

DropdownItem.displayName = 'NextUI - DropdownItem';

DropdownItem.toString = () => '.nextui-dropdown-item';

export default withDefaults(DropdownItem, defaultProps);
