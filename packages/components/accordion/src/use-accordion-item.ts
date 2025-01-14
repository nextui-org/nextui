import type {AccordionItemVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps} from "@heroui/system";
import {ReactRef} from "@heroui/react-utils";
import {DisclosureProps} from "@heroui/disclosure";
import {HTMLMotionProps} from "framer-motion";

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
}

export type UseAccordionItemProps = Props & AccordionItemVariantProps & DisclosureProps;

export function useAccordionItem(props: UseAccordionItemProps) {
  const state = useAccordianContext();

  const {id, ...otherProps} = props;
  const disclosureProps: DisclosureProps = {
    ...otherProps,
    isExpanded: state.expandedKeys.has(id),
    onExpandedChange(isExpanded) {
      if (state) {
        state.toggleKey(id);
      }
      props.onExpandedChange?.(isExpanded);
    },
  };

  return {
    disclosureProps,
    children: props.children,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
