import {forwardRef} from "@nextui-org/system";
import {LayoutGroup} from "framer-motion";
import {Divider} from "@nextui-org/divider";
import {Fragment} from "react";

import {UseAccordionProps, useAccordion} from "./use-accordion";
import AccordionItem from "./accordion-item";

export interface AccordionProps extends Omit<UseAccordionProps, "ref"> {}

const AccordionGroup = forwardRef<AccordionProps, "div">((props, ref) => {
  const {
    Component,
    values,
    state,
    isSplitted,
    showDivider,
    getBaseProps,
    disableAnimation,
    handleFocusChanged,
    itemClasses,
  } = useAccordion({
    ref,
    ...props,
  });

  const content = [...state.collection].map((item, index) => (
    <Fragment key={item.key}>
      <AccordionItem
        item={item}
        onFocusChange={(isFocused) => handleFocusChanged(isFocused, item.key)}
        {...item.props}
        {...values}
        classNames={{...itemClasses, ...(item.props.classNames || {})}}
      />
      {!isSplitted && showDivider && index < state.collection.size - 1 && <Divider />}
    </Fragment>
  ));

  return (
    <Component {...getBaseProps()}>
      {disableAnimation ? content : <LayoutGroup>{content}</LayoutGroup>}
    </Component>
  );
});

AccordionGroup.displayName = "NextUI.Accordion";

export default AccordionGroup;
