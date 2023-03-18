import {forwardRef} from "@nextui-org/system";
import {useMemo, ReactNode} from "react";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {motion, AnimatePresence} from "framer-motion";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends Omit<UseAccordionItemProps, "ref"> {}

const Accordion = forwardRef<AccordionItemProps, "div">((props, ref) => {
  const {
    Component,
    item,
    isOpen,
    isDisabled,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getTitleProps,
    getSubtitleProps,
    getContentProps,
    getIndicatorProps,
  } = useAccordionItem({ref, ...props});

  const indicator = useMemo<ReactNode | null>(() => {
    if (typeof item.props?.indicator === "function") {
      return item.props?.indicator({indicator: <ChevronIcon />, isOpen, isDisabled});
    }

    return <ChevronIcon />;
  }, [item.props?.indicator, isOpen, isDisabled]);

  return (
    <Component {...getBaseProps()}>
      <h2 {...getHeadingProps()}>
        <button {...getButtonProps()}>
          {item.props?.title && <h3 {...getTitleProps()}>{item.props?.title}</h3>}
          {item.props?.subtitle && <p {...getSubtitleProps()}>{item.props?.subtitle}</p>}
          {indicator && <span {...getIndicatorProps()}>{indicator}</span>}
        </button>
      </h2>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            {...getContentProps()}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            initial={{opacity: 0}}
          >
            {item.props?.children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Component>
  );
});

Accordion.displayName = "NextUI.AccordionItem";

export default Accordion;
