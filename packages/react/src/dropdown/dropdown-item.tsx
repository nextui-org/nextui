import React, { Key, useRef, useMemo } from 'react';
import { Node } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { useFocusRing } from '@react-aria/focus';
import type { FocusableProps } from '@react-types/shared';
import type { FocusRingAria } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { useMenuItem } from '@react-aria/menu';
import { CSS } from '../theme/stitches.config';
import type {
  SimpleColors,
  NormalWeights,
  DropdownVariants
} from '../utils/prop-types';
import { useDropdownContext } from './dropdown-context';
import { StyledDropdownItem } from './dropdown.styles';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props<T> extends FocusableProps {
  item: Node<T>;
  state: TreeState<T>;
  color?: SimpleColors;
  variant?: DropdownVariants;
  textColor?: SimpleColors;
  isVirtualized?: boolean;
  withDivider?: boolean;
  command?: string;
  dividerWeight?: NormalWeights;
  as?: keyof JSX.IntrinsicElements;
  onAction?: (key: Key) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

export type DropdownItemProps<T = object> = Props<T> &
  NativeAttrs & { css?: CSS };

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof DropdownItemProps>;
}

const DropdownItem = <T extends object>({
  as,
  css,
  item,
  state,
  color,
  command,
  textColor,
  variant,
  autoFocus,
  isVirtualized,
  withDivider,
  dividerWeight,
  onAction,
  className
}: DropdownItemProps<T>) => {
  const { onClose, closeOnSelect, disableAnimation, borderWeight } =
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

  const { isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({
    autoFocus
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

  const { menuItemProps, keyboardShortcutProps } = useMenuItem(
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

  const getState = useMemo(() => {
    if (isHovered) return 'hovered';
    if (isSelected) return 'selected';
    if (isPressed) return 'pressed';
    return isDisabled ? 'disabled' : 'ready';
  }, [isSelected, isDisabled, isHovered, isPressed]);

  const getTextColor = useMemo(() => {
    if (item.props.textColor) {
      return item.props.textColor;
    }
    if (item.props.color && textColor === 'default') {
      return item.props.color;
    }
    return textColor;
  }, [textColor, item.props.color, item.props.textColor]);

  const withCommand = useMemo(
    () => command || item.props.command,
    [command, item.props.command]
  );

  return (
    <StyledDropdownItem
      ref={ref}
      {...mergeProps(menuItemProps, hoverProps, pressProps, focusProps)}
      as={item.props.as || as}
      css={{ ...mergeProps(css, item.props.css) }}
      data-state={getState}
      color={item.props.color || color}
      variant={item.props.variant || variant}
      textColor={getTextColor}
      isFocused={isFocused}
      isFocusVisible={isFocusVisible}
      shouldShowOutline={isFocusVisible && variant === 'shadow'}
      isHovered={isHovered}
      isSelected={isSelected}
      isDisabled={isDisabled}
      isPressed={isPressed}
      isSelectable={isSelectable}
      withDivider={withDivider || item.props.withDivider}
      dividerWeight={dividerWeight || item.props.dividerWeight || borderWeight}
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
      {withCommand && <kbd {...keyboardShortcutProps}>{withCommand}</kbd>}
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
