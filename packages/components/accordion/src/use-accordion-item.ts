import type {AccordionItemVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps, PropGetter} from "@heroui/system";
import {ReactRef} from "@heroui/react-utils";
import {DisclosureProps} from "@heroui/disclosure";
import {accordionItem, AccordionItemSlots, SlotsToClasses} from "@heroui/theme";
import {PropGetter} from "@heroui/system";
import {DisclosureProps} from "@heroui/disclosure";
import {Key, useCallback, useMemo} from "react";
import {callAllHandlers} from "@nextui-org/shared-utils";

import {useAccordianContext} from "./accordian-context";
import {AccordionItemBaseProps} from "./base/accordion-item-base";

export interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  id: string;
  disabledKeys?: Iterable<Key>;
  classNames?: SlotsToClasses<AccordionItemSlots>;
  onFocusChange?: (isFocused: boolean, key?: React.Key) => void;
}

export type UseAccordionItemProps = Props &
  AccordionItemVariantProps &
  DisclosureProps &
  Omit<AccordionItemBaseProps, "onFocusChange">;

export function useAccordionItem(originalProps: UseAccordionItemProps) {
  const {state, values} = useAccordianContext();

  const {id, classNames, onFocusChange, ...otherProps} = originalProps;
  const {isDisabled} = values;
  const showDivider = values.showDivider && values.lastChildId != id;

  const containsKey = (iterable: Iterable<Key> | undefined, key: Key): boolean => {
    if (!iterable) {
      return false;
    }
    for (const item of iterable) {
      if (item === key) {
        return true;
      }
    }

    return false;
  };

  const disabledKeys = values.disabledKeys;

  const handleFocus = useCallback(() => {
    onFocusChange?.(true, id);
  }, []);

  const handleBlur = useCallback(() => {
    onFocusChange?.(false, id);
  }, []);

  const disclosureProps: DisclosureProps = {
    ...values,
    ...otherProps,
    isExpanded: state.expandedKeys.has(id),
    isDisabled: containsKey(disabledKeys, id) || isDisabled,
    onExpandedChange(isExpanded) {
      if (state) {
        state.toggleKey(id);
      }
      originalProps.onExpandedChange?.(isExpanded);
    },
    onFocus: callAllHandlers(handleFocus, originalProps.onFocus),
    onBlur: callAllHandlers(handleBlur, originalProps.onBlur),
    classNames,
  };

  const slots = useMemo(() => accordionItem(), []);

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.base({class: classNames?.base}),
        "data-hidden": originalProps.hidden,
        ...props,
      };
    },
    [originalProps.hidden],
  );

  return {
    disclosureProps,
    children: originalProps.children,
    dividerProps: values.dividerProps,
    hidden: originalProps.hidden,
    showDivider,
    getBaseProps,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
