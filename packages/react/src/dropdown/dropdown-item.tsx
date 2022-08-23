import type {FocusableProps} from "@react-types/shared";
import type {SimpleColors, NormalWeights, DropdownVariants} from "../utils/prop-types";
import type {IFocusRingAria, IMenuItemAria} from "./dropdown-types";

import React, {ReactNode, Key, useRef, useMemo} from "react";
import {Node} from "@react-types/shared";
import {mergeProps} from "@react-aria/utils";
import {TreeState} from "@react-stately/tree";
import {useFocusRing} from "@react-aria/focus";
import {useHover, usePress} from "@react-aria/interactions";
import {useMenuItem} from "@react-aria/menu";

import {CSS} from "../theme/stitches.config";
import Checkmark from "../utils/checkmark";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {useDropdownContext} from "./dropdown-context";
import {
  StyledDropdownItem,
  StyledDropdownItemKbd,
  StyledDropdownItemContent,
  StyledDropdownItemIconWrapper,
  StyledDropdownItemContentWrapper,
  StyledDropdownItemDescription,
} from "./dropdown.styles";

interface Props<T> extends FocusableProps {
  item: Node<T>;
  state: TreeState<T>;
  color?: SimpleColors;
  variant?: DropdownVariants;
  textColor?: SimpleColors;
  isVirtualized?: boolean;
  withDivider?: boolean;
  command?: string;
  description?: string;
  icon?: ReactNode;
  dividerWeight?: NormalWeights;
  as?: keyof JSX.IntrinsicElements;
  onAction?: (key: Key) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

export type DropdownItemProps<T = object> = Props<T> & NativeAttrs & {css?: CSS};

const DropdownItem = <T extends object>({
  as,
  css,
  item,
  state,
  color,
  icon,
  command,
  description,
  textColor,
  variant,
  autoFocus,
  isVirtualized,
  withDivider,
  dividerWeight,
  className,
  onAction,
}: DropdownItemProps<T>) => {
  const {onClose, closeOnSelect, disableAnimation, borderWeight} = useDropdownContext();

  const {rendered, key} = item;

  const isSelected = state.selectionManager.isSelected(key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const isDisabled = state.disabledKeys.has(key);

  const ref = useRef<HTMLLIElement>(null);

  const {pressProps, isPressed} = usePress({
    ref,
    isDisabled,
  });

  const {isFocusVisible, focusProps}: IFocusRingAria = useFocusRing({
    autoFocus,
  });

  const {hoverProps, isHovered} = useHover({isDisabled});

  const isSelectable = state.selectionManager.selectionMode !== "none" && !isDisabled;

  const {menuItemProps, labelProps, descriptionProps, keyboardShortcutProps}: IMenuItemAria =
    useMenuItem(
      {
        key,
        onClose,
        isSelected,
        isDisabled,
        "aria-label": item["aria-label"],
        closeOnSelect,
        isVirtualized,
        onAction,
      },
      state,
      ref,
    );

  const getState = useMemo(() => {
    if (isHovered) return "hovered";
    if (isSelected) return "selected";
    if (isPressed) return "pressed";

    return isDisabled ? "disabled" : "ready";
  }, [isSelected, isDisabled, isHovered, isPressed]);

  const getTextColor = useMemo(() => {
    if (item.props.textColor) {
      return item.props.textColor;
    }
    if (item.props.color && textColor === "default") {
      return item.props.color;
    }

    return textColor;
  }, [textColor, item.props.color, item.props.textColor]);

  const withDescription = useMemo(
    () => description || item.props.description,
    [description, item.props.description],
  );

  const withCommand = useMemo(() => command || item.props.command, [command, item.props.command]);

  const withIcon = useMemo(() => icon || item.props.icon, [icon, item.props.icon]);

  return (
    <StyledDropdownItem
      ref={ref}
      {...mergeProps(menuItemProps, hoverProps, pressProps, focusProps)}
      as={item.props.as || as}
      className={clsx(
        "nextui-dropdown-item",
        {
          "is-disabled": isDisabled,
          "is-selected": isSelected,
          "is-selectable": isSelectable,
          "is-hovered": isHovered,
          "is-focused": isFocused,
          "is-pressed": isPressed,
        },
        className,
        item.props.className,
      )}
      color={item.props.color || color}
      css={{...mergeProps(css, item.props.css)}}
      data-state={getState}
      disableAnimation={disableAnimation}
      dividerWeight={dividerWeight || item.props.dividerWeight || borderWeight}
      isDisabled={isDisabled}
      isFocusVisible={isFocusVisible}
      isFocused={isFocused}
      isHovered={isHovered}
      isPressed={isPressed}
      isSelectable={isSelectable}
      isSelected={isSelected}
      shouldShowOutline={isFocusVisible && variant === "shadow"}
      textColor={getTextColor}
      variant={item.props.variant || variant}
      withDescription={!!withDescription}
      withDivider={withDivider || item.props.withDivider}
    >
      {withIcon && (
        <StyledDropdownItemIconWrapper className="nextui-dropdown-item-icon-wrapper">
          {withIcon}
        </StyledDropdownItemIconWrapper>
      )}
      {withDescription ? (
        <StyledDropdownItemContentWrapper>
          <StyledDropdownItemContent className="nextui-dropdown-item-content" {...labelProps}>
            {rendered}
          </StyledDropdownItemContent>
          <StyledDropdownItemDescription
            className="nextui-dropdown-item-description"
            hasCommand={!!withCommand}
            hasIcon={!!withIcon}
            {...descriptionProps}
          >
            {withDescription}
          </StyledDropdownItemDescription>
        </StyledDropdownItemContentWrapper>
      ) : (
        <StyledDropdownItemContent className="nextui-dropdown-item-content" {...labelProps}>
          {rendered}
        </StyledDropdownItemContent>
      )}

      {withCommand && (
        <StyledDropdownItemKbd className="nextui-dropdown-item-command" {...keyboardShortcutProps}>
          {withCommand}
        </StyledDropdownItemKbd>
      )}
      {isSelected && (
        <Checkmark
          css={{
            ml: "$4",
          }}
        />
      )}
    </StyledDropdownItem>
  );
};

if (__DEV__) {
  DropdownItem.displayName = "NextUI.DropdownItem";
}
DropdownItem.toString = () => ".nextui-dropdown-item";

export default DropdownItem;
