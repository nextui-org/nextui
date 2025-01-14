import type {SelectionBehavior, MultipleSelection} from "@react-types/shared";
import type {AriaAccordionProps} from "@react-types/accordion";
<<<<<<< HEAD
import type {AccordionGroupVariantProps} from "@heroui/theme";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";

import {useProviderContext} from "@heroui/system";
import {ReactRef, filterDOMProps} from "@heroui/react-utils";
import React, {Key, useCallback} from "react";
import {TreeState, useTreeState} from "@react-stately/tree";
import {mergeProps} from "@react-aria/utils";
import {accordion} from "@heroui/theme";
import {useDOMRef} from "@heroui/react-utils";
import {useMemo, useState} from "react";
import {DividerProps} from "@heroui/divider";
import {useReactAriaAccordion} from "@heroui/use-aria-accordion";
=======
import type {AccordionGroupVariantProps} from "@nextui-org/theme";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {ReactRef} from "@nextui-org/react-utils";
import {Key} from "react";
import {DividerProps} from "@nextui-org/divider";
import {useDisclosureGroupState} from "@react-stately/disclosure";
>>>>>>> 8a3997858 (chore: using the disclosure api)

import {AccordionItemProps} from "./accordion-item";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether to display a divider at the bottom of the each accordion item.
   *
   * @default true
   */
  showDivider?: boolean;
  /**
   * The divider props.
   */
  dividerProps?: Partial<DividerProps>;
  /**
   * The accordion selection behavior.
   * @default "toggle"
   */
  selectionBehavior?: SelectionBehavior;
  /**
   * Whether to keep the accordion content mounted when collapsed.
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * The accordion items classNames.
   */
  itemClasses?: AccordionItemProps["classNames"];
}

export type UseAccordionProps<T extends object = {}> = Props &
  AccordionItemProps &
  AriaAccordionProps<T> &
  MultipleSelection &
  AccordionGroupVariantProps;

export type ValuesType = {
  focusedKey?: Key | null;
  isCompact?: AccordionItemProps["isCompact"];
  isDisabled?: AccordionItemProps["isDisabled"];
  hideIndicator?: AccordionItemProps["hideIndicator"];
  disableAnimation?: AccordionItemProps["disableAnimation"];
  keepContentMounted?: Props["keepContentMounted"];
  disableIndicatorAnimation?: AccordionItemProps["disableAnimation"];
  motionProps?: AccordionItemProps["motionProps"];
};

export function useAccordion<T extends object>(originalProps: UseAccordionProps<T>) {
  const state = useDisclosureGroupState(originalProps);

  return {
    state,
  };
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
