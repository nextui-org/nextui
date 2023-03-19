import {forwardRef} from "@nextui-org/system";
import {useMemo, ReactNode} from "react";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {Collapse} from "@nextui-org/framer-transitions";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends Omit<UseAccordionItemProps, "ref"> {}

const Accordion = forwardRef<AccordionItemProps, "div">((props, ref) => {
  const {
    Component,
    item,
    styles,
    slots,
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

  const indicator = useMemo<ReactNode | null>(() => {
    if (typeof item.props?.indicator === "function") {
      return item.props?.indicator({indicator: <ChevronIcon />, isOpen, isDisabled});
    }

    if (item.props?.indicator) return item.props?.indicator;

    return <ChevronIcon />;
  }, [item.props?.indicator, isOpen, isDisabled]);

  const content = useMemo(() => {
    if (disableAnimation) {
      return <div {...getContentProps()}>{item.props?.children}</div>;
    }

    return (
      <Collapse in={isOpen} {...motionProps}>
        <div {...getContentProps()}>{item.props?.children}</div>
      </Collapse>
    );
  }, [isOpen, disableAnimation, item.props?.children, motionProps]);

  return (
    <Component {...getBaseProps()}>
      <h2 {...getHeadingProps()}>
        <button {...getButtonProps()}>
          {item.props?.leftIndicator && (
            <div className={slots.leftIndicator({class: styles?.leftIndicator})}>
              {item.props?.leftIndicator}
            </div>
          )}
          <div className={slots.titleWrapper({class: styles?.titleWrapper})}>
            {item.props?.title && <span {...getTitleProps()}>{item.props?.title}</span>}
            {item.props?.subtitle && <span {...getSubtitleProps()}>{item.props?.subtitle}</span>}
          </div>
          {indicator && <span {...getIndicatorProps()}>{indicator}</span>}
        </button>
      </h2>
      {content}
    </Component>
  );
});

Accordion.displayName = "NextUI.AccordionItem";

export default Accordion;
