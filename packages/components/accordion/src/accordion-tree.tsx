import {forwardRef, ReactNode} from "react";

import AccordionItem, {AccordionItemProps} from "./accordion-item";
import Accordion, {AccordionProps} from "./accordion";

export interface AccordionTreeItemProps extends Omit<AccordionItemProps, "children"> {
  contentMain?: ReactNode;
  contentChildren?: AccordionTreeItemProps[];
}

export interface AccordionTreeProps extends Omit<AccordionProps, "children"> {
  items: AccordionTreeItemProps[];
}

const AccordionTree = forwardRef<HTMLDivElement, AccordionTreeProps>((props, ref) => {
  const {
    items,
    itemClasses: propsItemClasses,
    className,
    isCompact = true,
    selectionMode = "multiple",
    ...otherProps
  } = props;

  const itemClasses = {
    ...propsItemClasses,
    trigger: propsItemClasses?.trigger ?? "py-1",
    base: propsItemClasses?.base ?? "py-0",
  };

  return (
    <Accordion
      ref={ref}
      {...otherProps}
      className={className}
      isCompact={isCompact}
      itemClasses={itemClasses}
      selectionMode={selectionMode}
    >
      {items.map((item, index) => {
        const {contentMain, contentChildren, ...itemProps} = item;

        return (
          <AccordionItem key={index} {...itemProps}>
            {contentMain && contentMain}
            {contentChildren && (
              <AccordionTree
                isCompact={isCompact}
                itemClasses={itemClasses}
                items={contentChildren}
                selectionMode={selectionMode}
              />
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
});

AccordionTree.displayName = "NextUI.AccordionTree";

export default AccordionTree;
