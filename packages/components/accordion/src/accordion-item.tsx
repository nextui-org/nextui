import {forwardRef} from "@heroui/system";
import {Disclosure} from "@heroui/disclosure";
import {Divider} from "@heroui/divider";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends UseAccordionItemProps {}

const AccordionItem = forwardRef<"button", AccordionItemProps>((props, ref) => {
  const {disclosureProps, hideIndicator, children, dividerProps, hidden, getBaseProps} =
    useAccordionItem(props);

  return (
    <div {...getBaseProps()}>
      <Disclosure {...disclosureProps} ref={ref}>
        {children}
      </Disclosure>
      {!hideIndicator && !hidden && <Divider {...dividerProps} />}
    </div>
  );
});

AccordionItem.displayName = "HeroUI.AccordionItem";

export default AccordionItem;
