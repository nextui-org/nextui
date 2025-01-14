import {forwardRef} from "@heroui/system";
import {Disclosure} from "@heroui/disclosure";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends UseAccordionItemProps {}

const AccordionItem = forwardRef<"button", AccordionItemProps>((props, ref) => {
  const {disclosureProps, children} = useAccordionItem(props);

  return (
    <Disclosure {...disclosureProps} ref={ref}>
      {children}
    </Disclosure>
  );
});

AccordionItem.displayName = "HeroUI.AccordionItem";

export default AccordionItem;
