"use client";

import type {SurfaceVariants} from "../surface";
import type {DropdownVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {dropdownVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Button} from "react-aria-components/Button";
import {
  Menu as MenuPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components/Menu";

import {useResolvedClassName} from "../../utils/compose";
import {usePopoverExitHold} from "../../utils/use-popover-exit-hold";
import {MenuItemIndicator, MenuItemRoot, MenuItemSubmenuIndicator} from "../menu-item";
import {MenuSectionRoot} from "../menu-section";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Context
 * -----------------------------------------------------------------------------------------------*/
type DropdownContext = {
  slots?: ReturnType<typeof dropdownVariants>;
};

const DropdownContext = createContext<DropdownContext>({});

// The open path clips the popover until a keyboard check finishes. Closing
// before that check returns would play the exit inside an empty clip.
const revealPopoverForExit = (popover: HTMLElement) => {
  popover.style.clip = "auto";
  popover.style.clipPath = "none";
  popover.style.maskImage = "none";
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Root (MenuTrigger wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownRootProps
  extends ComponentPropsWithRef<typeof MenuTriggerPrimitive>, DropdownVariants {
  className?: string;
}

const DropdownRoot = ({children, ...props}: DropdownRootProps) => {
  const slots = React.useMemo(() => dropdownVariants(), []);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <DropdownContext value={contextValue}>
      <MenuTriggerPrimitive {...props}>{children}</MenuTriggerPrimitive>
    </DropdownContext>
  );
};

DropdownRoot.displayName = "HeroUI.Dropdown";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Trigger (Button wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownTriggerProps extends ComponentPropsWithRef<typeof Button> {}

const DropdownTrigger = ({children, className, ...props}: DropdownTriggerProps) => {
  const {slots} = use(DropdownContext);

  return (
    <Button
      className={useResolvedClassName(className, slots?.trigger())}
      data-slot="dropdown-trigger"
      {...props}
    >
      {children}
    </Button>
  );
};

DropdownTrigger.displayName = "HeroUI.Dropdown.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Popover (Popover wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownPopoverProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children">, DropdownVariants {
  children: React.ReactNode;
}

const DropdownPopover = ({
  children,
  className,
  defaultOpen,
  isExiting: isExitingProp,
  isOpen,
  placement,
  ref,
  ...props
}: DropdownPopoverProps) => {
  const {slots} = use(DropdownContext);
  // Root menu and each submenu provide their own trigger state. The nearest one
  // is the popover that is closing, so a submenu holds its own exit.
  const {isExiting, ref: overlayRef} = usePopoverExitHold(
    {...props, defaultOpen, isOpen},
    {prepare: revealPopoverForExit, ref},
  );

  // React Aria reveals the popover only after `runAfterKeyboard`. On a touch
  // device that waits up to ~800ms when focus looks like a text field, which
  // the docs page hits and the Storybook iframe does not. Skip the enter
  // animation so that late reveal cannot play the menu in from opacity 0.
  const skipEnterAnimation =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        ref={overlayRef}
        className={useResolvedClassName(className, slots?.popover())}
        data-slot="dropdown-popover"
        defaultOpen={defaultOpen}
        isExiting={isExiting || isExitingProp}
        isOpen={isOpen}
        placement={placement}
        shouldSkipAnimation={skipEnterAnimation || props.shouldSkipAnimation}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
};

DropdownPopover.displayName = "HeroUI.Dropdown.Popover";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Menu (Menu wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownMenuProps<T extends object>
  extends ComponentPropsWithRef<typeof MenuPrimitive<T>>, DropdownVariants {
  className?: string;
}

function DropdownMenu<T extends object>({className, ...props}: DropdownMenuProps<T>) {
  const {slots} = use(DropdownContext);

  return (
    <MenuPrimitive
      className={useResolvedClassName(className, slots?.menu())}
      data-selection-mode={props.selectionMode}
      data-slot="dropdown-menu"
      {...props}
    />
  );
}

DropdownMenu.displayName = "HeroUI.Dropdown.Menu";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item (MenuItem wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemProps extends ComponentPropsWithRef<typeof MenuItemRoot> {}

const DropdownItem = (props: DropdownItemProps) => {
  return <MenuItemRoot {...props} />;
};

DropdownItem.displayName = "HeroUI.Dropdown.Item";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Indicator (MenuItemSubmenuIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuIndicatorProps extends ComponentPropsWithRef<
  typeof MenuItemSubmenuIndicator
> {}

const DropdownSubmenuIndicator = (props: DropdownSubmenuIndicatorProps) => {
  return <MenuItemSubmenuIndicator {...props} />;
};

DropdownSubmenuIndicator.displayName = "HeroUI.Dropdown.SubmenuIndicator";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuTriggerProps extends ComponentPropsWithRef<
  typeof SubmenuTriggerPrimitive
> {}

const DropdownSubmenuTrigger = ({children, ...props}: DropdownSubmenuTriggerProps) => {
  return (
    <SubmenuTriggerPrimitive data-slot="dropdown-submenu-trigger" {...props}>
      {children}
    </SubmenuTriggerPrimitive>
  );
};

DropdownSubmenuTrigger.displayName = "HeroUI.Dropdown.SubmenuTrigger";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item Indicator (MenuItemIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemIndicatorProps extends ComponentPropsWithRef<typeof MenuItemIndicator> {}

const DropdownItemIndicator = (props: DropdownItemIndicatorProps) => {
  return <MenuItemIndicator {...props} />;
};

DropdownItemIndicator.displayName = "HeroUI.Dropdown.ItemIndicator";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Section (MenuSection wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSectionProps extends ComponentPropsWithRef<typeof MenuSectionRoot> {}

const DropdownSection = (props: DropdownSectionProps) => {
  return <MenuSectionRoot {...props} />;
};

DropdownSection.displayName = "HeroUI.Dropdown.Section";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
};

export type {
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownPopoverProps,
  DropdownRootProps,
  DropdownSectionProps,
  DropdownSubmenuIndicatorProps,
  DropdownSubmenuTriggerProps,
  DropdownTriggerProps,
};
