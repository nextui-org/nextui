"use client";

import {forwardRef} from "@nextui-org/system";
import {useMemo, ReactNode} from "react";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {CollapseTransition} from "@nextui-org/framer-transitions";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends Omit<UseAccordionItemProps, "ref"> {}

const Accordion = forwardRef<AccordionItemProps, "div">((props, ref) => {
  const {
    Component,
    styles,
    slots,
    indicator,
    children,
    title,
    subtitle,
    leftIndicator,
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
      <CollapseTransition in={isOpen} {...motionProps}>
        <div {...getContentProps()}>{children}</div>
      </CollapseTransition>
    );
  }, [isOpen, disableAnimation, children, motionProps]);

  return (
    <Component {...getBaseProps()}>
      <h2 {...getHeadingProps()}>
        <button {...getButtonProps()}>
          {leftIndicator && (
            <div className={slots.leftIndicator({class: styles?.leftIndicator})}>
              {leftIndicator}
            </div>
          )}
          <div className={slots.titleWrapper({class: styles?.titleWrapper})}>
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

Accordion.displayName = "NextUI.AccordionItem";

export default Accordion;
