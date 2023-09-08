import {AriaToggleButtonProps, useAriaToggleButton} from "@nextui-org/use-aria-toggle-button";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useToggleState} from "@react-stately/toggle";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {useHover} from "@react-aria/interactions";
import {useMemo, ReactNode} from "react";

import {useNavbarContext} from "./navbar-context";

export interface Props extends Omit<HTMLNextUIProps<"button">, keyof AriaToggleButtonProps> {
  /**
   * The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).
   */
  value?: string;
  /**
   * Text to display for screen readers.
   * @default open/close navigation menu
   */
  srOnlyText?: string;
  /**
   * The icon to display.
   */
  icon?: ReactNode | ((isOpen: boolean) => ReactNode) | null;
}

export type NavbarMenuToggleProps = Props & AriaToggleButtonProps;

const NavbarMenuToggle = forwardRef<"button", NavbarMenuToggleProps>((props, ref) => {
  const {
    as,
    icon,
    className,
    onChange,
    autoFocus,
    srOnlyText: srOnlyTextProp,
    ...otherProps
  } = props;

  const Component = as || "button";
  const domRef = useDOMRef(ref);

  const {slots, classNames, isMenuOpen, setIsMenuOpen} = useNavbarContext();

  const handleChange = (isOpen: boolean) => {
    onChange?.(isOpen);
    setIsMenuOpen(isOpen);
  };

  const state = useToggleState({...otherProps, isSelected: isMenuOpen, onChange: handleChange});

  const {buttonProps, isPressed} = useAriaToggleButton(props, state, domRef);
  const {isFocusVisible, focusProps} = useFocusRing({autoFocus});
  const {isHovered, hoverProps} = useHover({});

  const toggleStyles = clsx(classNames?.toggle, className);

  const child = useMemo(() => {
    if (typeof icon === "function") {
      return icon(isMenuOpen ?? false);
    }

    return icon || <span className={slots.toggleIcon({class: classNames?.toggleIcon})} />;
  }, [icon, slots.toggleIcon, classNames?.toggleIcon]);

  const srOnlyText = useMemo(() => {
    if (srOnlyTextProp) {
      return srOnlyTextProp;
    }

    return state.isSelected ? "close navigation menu" : "open navigation menu";
  }, [srOnlyTextProp, isMenuOpen]);

  return (
    <Component
      ref={domRef}
      className={slots.toggle?.({class: toggleStyles})}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-open={dataAttr(isMenuOpen)}
      data-pressed={dataAttr(isPressed)}
      {...mergeProps(buttonProps, focusProps, hoverProps, otherProps)}
    >
      <span className={slots.srOnly()}>{srOnlyText}</span>
      {child}
    </Component>
  );
});

NavbarMenuToggle.displayName = "NextUI.NavbarMenuToggle";

export default NavbarMenuToggle;
