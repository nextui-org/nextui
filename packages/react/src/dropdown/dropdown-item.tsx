import React, { Key, useRef, useMemo } from 'react';
import { Node } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { useHover, usePress } from '@react-aria/interactions';
import { useMenuItem } from '@react-aria/menu';
import { CSS } from '../theme/stitches.config';
import { useDropdownContext } from './dropdown-context';
import { StyledDropdownItem } from './dropdown.styles';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props<T> {
  item: Node<T>;
  state: TreeState<T>;
  isVirtualized?: boolean;
  as?: keyof JSX.IntrinsicElements;
  onAction?: (key: Key) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

export type DropdownItemProps<T> = Props<T> & NativeAttrs & { css?: CSS };

const DropdownItem = <T extends object>({
  as,
  css,
  item,
  state,
  isVirtualized,
  onAction,
  className
}: DropdownItemProps<T>) => {
  const { color, onClose, closeOnSelect, disableAnimation } =
    useDropdownContext();

  const { rendered, key } = item;

  const isSelected = state.selectionManager.isSelected(key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const isDisabled = state.disabledKeys.has(key);

  const ref = useRef<HTMLLIElement>(null);

  const { pressProps, isPressed } = usePress({
    ref,
    isDisabled
  });

  // const { menuItemProps, labelProps, descriptionProps, keyboardShortcutProps } =
  // useMenuItem(
  //   {
  //     isSelected,
  //     isDisabled,
  //     'aria-label': item['aria-label'],
  //     key,
  //     onClose,
  //     closeOnSelect,
  //     isVirtualized,
  //     onAction
  //   },
  //   state,
  //   ref
  // );

  const { menuItemProps } = useMenuItem(
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
  const isSelectable =
    state.selectionManager.selectionMode !== 'none' && !isDisabled;

  // const contents =
  //   typeof rendered === 'string' ? (
  //     <Text css={{ mb: 0, size: '100%' }}>{rendered}</Text>
  //   ) : (
  //     rendered
  //   );

  const getState = useMemo(() => {
    if (isHovered) return 'hovered';
    if (isSelected) return 'selected';
    if (isPressed) return 'pressed';
    return isDisabled ? 'disabled' : 'ready';
  }, [isSelected, isDisabled, isHovered, isPressed]);

  return (
    <StyledDropdownItem
      ref={ref}
      {...mergeProps(menuItemProps, hoverProps, pressProps)}
      as={item.props.as || as}
      css={{ ...mergeProps(css, item.props.css) }}
      data-state={getState}
      color={item.props.color || color}
      textColor={item.props.textColor || item.props.color}
      isFocused={isFocused}
      isHovered={isHovered}
      isSelected={isSelected}
      isDisabled={isDisabled}
      isPressed={isPressed}
      isSelectable={isSelectable}
      withDivider={item.props.withDivider}
      disableAnimation={disableAnimation}
      className={clsx(
        'nextui-dropdown-item',
        {
          'is-disabled': isDisabled,
          'is-selected': isSelected,
          'is-selectable': isSelectable,
          'is-hovered': isHovered,
          'is-focused': isFocused,
          'is-pressed': isPressed
        },
        className,
        item.props.className
      )}
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
      {rendered}
      {/* {isSelected && (
              <CheckmarkMedium
                slot="checkmark"
                UNSAFE_className={classNames(styles, 'spectrum-Menu-checkmark')}
              />
            )}
          </SlotProvider>
        </ClearSlots>
      </Grid> */}
    </StyledDropdownItem>
  );
};

if (__DEV__) {
  DropdownItem.displayName = 'NextUI.DropdownItem';
}
DropdownItem.toString = () => '.nextui-dropdown-item';

export default DropdownItem;
