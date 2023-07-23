import {forwardRef} from "react";
import {LayoutGroup} from "framer-motion";
import {Divider} from "@nextui-org/divider";
import {Fragment, Key, useCallback, useMemo} from "react";

import {UseAccordionProps, useAccordion} from "./use-accordion";
import AccordionItem from "./accordion-item";

export interface AccordionProps extends Omit<UseAccordionProps, "ref"> {}

const AccordionGroup = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    Component,
    values,
    state,
    isSplitted,
    showDivider,
    getBaseProps,
    disableAnimation,
    handleFocusChanged: handleFocusChangedProps,
    itemClasses,
  } = useAccordion({
    ref,
    ...props,
  });
  const handleFocusChanged = useCallback(
    (isFocused: boolean, key: Key) => handleFocusChangedProps(isFocused, key),
    [handleFocusChangedProps],
  );

  const content = useMemo(() => {
    return [...state.collection].map((item, index) => {
      const classNames = {...itemClasses, ...(item.props.classNames || {})};

      return (
        <Fragment key={item.key}>
          <AccordionItem
            item={item}
            onFocusChange={handleFocusChanged}
            {...item.props}
            {...values}
            classNames={classNames}
          />
          {!isSplitted && showDivider && index < state.collection.size - 1 && <Divider />}
        </Fragment>
      );
    });
  }, [values, itemClasses, handleFocusChanged, isSplitted, showDivider, state.collection]);

  return (
    <Component {...getBaseProps()}>
      {disableAnimation ? content : <LayoutGroup>{content}</LayoutGroup>}
    </Component>
  );
});

AccordionGroup.displayName = "NextUI.Accordion";

export default AccordionGroup;
