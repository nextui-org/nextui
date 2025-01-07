import type {AriaButtonProps} from "@heroui/use-aria-button";

import {HTMLHeroUIProps} from "@heroui/system";
import {useAriaButton} from "@heroui/use-aria-button";
import {useHover} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {forwardRef} from "react";
import {useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {dataAttr} from "@heroui/shared-utils";
import {mergeProps} from "@react-aria/utils";

const CalendarPickerItem = forwardRef<
  HTMLButtonElement,
  HTMLHeroUIProps<"button"> & AriaButtonProps
>(({children, autoFocus, isDisabled, onKeyDown, ...otherProps}, ref) => {
  const domRef = useDOMRef(ref);

  const {buttonProps: ariaButtonProps, isPressed} = useAriaButton(
    {
      elementType: "button",
      isDisabled,
      onKeyDown,
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const {isHovered, hoverProps} = useHover({isDisabled});

  return (
    <button
      ref={domRef}
      data-disabled={dataAttr(isDisabled)}
      data-focus={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-pressed={dataAttr(isPressed)}
      data-slot="picker-item"
      {...mergeProps(
        focusProps,
        hoverProps,
        ariaButtonProps,
        filterDOMProps(otherProps, {enabled: true}),
      )}
    >
      {children}
    </button>
  );
});

CalendarPickerItem.displayName = "CalendarPickerItem";

export {CalendarPickerItem};
