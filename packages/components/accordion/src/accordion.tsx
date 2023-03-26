"use client";

import {forwardRef} from "@nextui-org/system";

import {UseAccordionProps, useAccordion} from "./use-accordion";
import {AccordionProvider} from "./accordion-context";
import AccordionItem from "./accordion-item";

export interface AccordionProps extends Omit<UseAccordionProps, "ref"> {}

const AccordionGroup = forwardRef<AccordionProps, "div">((props, ref) => {
  const {Component, context, state, getBaseProps, handleFocusChanged} = useAccordion({
    ref,
    ...props,
  });

  return (
    <Component {...getBaseProps()}>
      <AccordionProvider value={context}>
        {[...state.collection].map((item) => (
          <AccordionItem
            key={item.key}
            item={item}
            onFocusChange={(isFocused) => handleFocusChanged(isFocused, item.key)}
          />
        ))}
      </AccordionProvider>
    </Component>
  );
});

AccordionGroup.displayName = "NextUI.Accordion";

export default AccordionGroup;
