import { AccordionProps } from '@nextui-org/react';
import {
  Accordion,
  AccordionItem,
  AccordionItemProps
} from '@nextui-org/accordion';
import { forwardRef, ReactNode } from 'react';

export interface AccordionTreeItemProps
  extends Omit<AccordionItemProps, 'children'> {
  contentMain?: ReactNode;
  contentChildren?: AccordionTreeItemProps[];
}

export interface AccordionTreeProps extends Omit<AccordionProps, 'children'> {
  items: AccordionTreeItemProps[];
}

const AccordionTree = forwardRef<HTMLDivElement, AccordionTreeProps>(
  (props, ref) => {
    const {
      items,
      itemClasses: propsItemClasses,
      className,
      isCompact = true,
      selectionMode = 'multiple',
      ...otherProps
    } = props;

    const itemClasses = {
      ...propsItemClasses,
      trigger: propsItemClasses?.trigger ?? 'py-1',
      base: propsItemClasses?.base ?? 'py-0'
    };

    return (
      <Accordion
        ref={ref}
        {...otherProps}
        selectionMode={selectionMode}
        isCompact={isCompact}
        itemClasses={itemClasses}
        className={className}
      >
        {items.map((item, index) => {
          const { contentMain, contentChildren, ...itemProps } = item;
          return (
            <AccordionItem key={index} {...itemProps}>
              {contentMain && contentMain}
              {contentChildren && (
                <AccordionTree
                  itemClasses={itemClasses}
                  isCompact={isCompact}
                  selectionMode={selectionMode}
                  items={contentChildren}
                />
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }
);

AccordionTree.displayName = 'NextUI.AccordionTree';

export default AccordionTree;
