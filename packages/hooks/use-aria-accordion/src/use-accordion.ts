import {AriaAccordionProps} from "@react-types/accordion";
import {ButtonHTMLAttributes, RefObject} from "react";
import {DOMAttributes, Node} from "@react-types/shared";
import {TreeState} from "@react-stately/tree";
import {useSelectableList} from "@react-aria/selection";

export interface AccordionAria {
  /** Props for the accordion container element. */
  accordionProps: DOMAttributes;
}

export interface AccordionItemAriaProps<T> {
  item: Node<T>;
}

export interface AccordionItemAria {
  /** Props for the accordion item button. */
  buttonProps: ButtonHTMLAttributes<HTMLElement>;
  /** Props for the accordion item content element. */
  regionProps: DOMAttributes;
}

export function useReactAriaAccordion<T>(
  props: AriaAccordionProps<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLDivElement>,
): AccordionAria {
  let {listProps} = useSelectableList({
    ...props,
    ...state,
    allowsTabNavigation: true,
    disallowSelectAll: true,
    ref,
  });

  // Fix: https://github.com/nextui-org/nextui/issues/1608 & https://github.com/nextui-org/nextui/issues/1405
  // Remove onKeyDownCapture from listProps to prevent it from removing spacebar support for
  // inner elements as the Input, this event provides typeahead support for the list, but we
  // don't need it for the accordion.
  delete listProps.onKeyDownCapture;

  return {
    accordionProps: {
      ...listProps,
      tabIndex: undefined,
    },
  };
}
