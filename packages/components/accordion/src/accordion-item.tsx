import {forwardRef} from "@nextui-org/system";
import {useMemo, ReactNode} from "react";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {AnimatePresence, motion} from "framer-motion";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends Omit<UseAccordionItemProps, "ref"> {}

const AccordionItem = forwardRef<AccordionItemProps, "div">((props, ref) => {
  const {
    Component,
    classNames,
    slots,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getTitleProps,
    getSubtitleProps,
    getContentProps,
    getIndicatorProps,
  } = useAccordionItem({ref, ...props});

  const indicatorContent = useMemo<ReactNode | null>(() => {
    if (typeof indicator === "function") {
      return indicator({indicator: <ChevronIcon />, isOpen, isDisabled});
    }

    if (indicator) return indicator;

    return <ChevronIcon />;
  }, [indicator, isOpen, isDisabled]);

  const content = useMemo(() => {
    if (disableAnimation) {
      return <div {...getContentProps()}>{children}</div>;
    }

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            animate="enter"
            exit="exit"
            initial="exit"
            variants={TRANSITION_VARIANTS.collapse}
            {...motionProps}
          >
            <div {...getContentProps()}>{children}</div>
          </motion.section>
        )}
      </AnimatePresence>
    );
  }, [isOpen, disableAnimation, children, motionProps]);

  return (
    <Component {...getBaseProps()}>
      <h2 {...getHeadingProps()}>
        <button {...getButtonProps()}>
          {startContent && (
            <div className={slots.startContent({class: classNames?.startContent})}>
              {startContent}
            </div>
          )}
          <div className={slots.titleWrapper({class: classNames?.titleWrapper})}>
            {title && <span {...getTitleProps()}>{title}</span>}
            {subtitle && <span {...getSubtitleProps()}>{subtitle}</span>}
          </div>
          {indicatorContent && <span {...getIndicatorProps()}>{indicatorContent}</span>}
        </button>
      </h2>
      {content}
    </Component>
  );
});

AccordionItem.displayName = "NextUI.AccordionItem";

export default AccordionItem;
