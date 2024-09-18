import { AccordionProps } from '@nextui-org/react';
import {
  Accordion,
  AccordionItem,
  AccordionItemProps
} from '@nextui-org/accordion';
import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

export interface AccordionTreeItemProps
  extends Omit<AccordionItemProps, 'children'> {
  contentMain?: ReactNode;
  contentChildren?: AccordionTreeItemProps[];
}

export interface AccordionTreeProps extends Omit<AccordionProps, 'children'> {
  items: AccordionTreeItemProps[];
}

const AccordionTree = forwardRef<'div', AccordionTreeProps>((props, ref) => {
  const {
    items,
    itemClasses: propsItemClasses,
    className: propsClassName,
    isCompact = true,
    selectionMode = 'multiple',
    ...otherProps
  } = props;

  const itemClasses = {
    ...propsItemClasses,
    trigger: clsx('py-1', propsItemClasses?.trigger),
    base: clsx('py-0', propsItemClasses?.base)
  };

  const className = clsx(propsClassName);

  return (
    <Accordion
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
});

AccordionTree.displayName = 'NextUI.AccordionTree';

export default AccordionTree;

//
// export function AccordionTree({
//   items,
//   itemClasses: propsItemClasses,
//   className: propsClassName,
//   isCompact = true,
//   selectionMode = 'multiple',
//   ...props
// }: { items: AccordionTreeItemProps[] } & Omit<AccordionProps, 'children'>) {
//   const itemClasses = {
//     ...propsItemClasses,
//     trigger: clsx('py-1', propsItemClasses?.trigger),
//     base: clsx('py-0', propsItemClasses?.base)
//   };
//
//   const className = clsx(propsClassName);
//
//   return (
//     <Accordion
//       {...props}
//       selectionMode={selectionMode}
//       isCompact={isCompact}
//       itemClasses={itemClasses}
//       className={className}
//     >
//       {items.map((item, index) => {
//         const { contentMain, contentChildren, ...itemProps } = item;
//         return (
//           <AccordionItem key={index} {...itemProps}>
//             {contentMain && contentMain}
//             {contentChildren && (
//               <AccordionTree
//                 itemClasses={itemClasses}
//                 isCompact={isCompact}
//                 selectionMode={selectionMode}
//                 items={contentChildren}
//               />
//             )}
//           </AccordionItem>
//         );
//       })}
//     </Accordion>
//   );
// }
