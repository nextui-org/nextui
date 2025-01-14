import type {AccordionItemVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps} from "@heroui/system";
import {ReactRef} from "@heroui/react-utils";
import {DisclosureProps} from "@heroui/disclosure";
import {HTMLMotionProps} from "framer-motion";
import {Key} from "react";

import {useAccordianContext} from "./accordian-context";

export interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"section">;
  id: string;
  disabledKeys?: Iterable<Key>;
}

export type UseAccordionItemProps = Props & AccordionItemVariantProps & DisclosureProps;

export function useAccordionItem(originalProps: UseAccordionItemProps) {
  const {state, values} = useAccordianContext();

  const {id, ...otherProps} = originalProps;

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

  const disclosureProps: DisclosureProps = {
    ...values,
    ...otherProps,
    isExpanded: state.expandedKeys.has(id),
    isDisabled: containsKey(disabledKeys, id),
    onExpandedChange(isExpanded) {
      if (state) {
        state.toggleKey(id);
      }
      originalProps.onExpandedChange?.(isExpanded);
    },
  };

  return {
    disclosureProps,
    children: originalProps.children,
    hideIndicator: (values.hideIndicator || values.lastChildId === id) ?? false,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
