"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {LinkVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {linkVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Link as LinkPrimitive} from "react-aria-components/Link";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {ExternalLinkIcon} from "../icons";

/* ------------------------------------------------------------------------------------------------
 * Link Context
 * --------------------------------------------------------------------------------------------- */
type LinkContext = {
  slots?: ReturnType<typeof linkVariants>;
};

const LinkContext = createContext<LinkContext>({});

/* ------------------------------------------------------------------------------------------------
 * Link Root
 * --------------------------------------------------------------------------------------------- */
interface LinkRootProps extends ComponentPropsWithRef<typeof LinkPrimitive>, LinkVariants {}

const LinkRoot = ({children, className, ...props}: LinkRootProps) => {
  const slots = React.useMemo(() => linkVariants(), []);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <LinkContext value={contextValue}>
      <LinkPrimitive
        data-slot="link"
        {...props}
        className={useResolvedClassName(className, slots?.base())}
      >
        {children}
      </LinkPrimitive>
    </LinkContext>
  );
};

LinkRoot.displayName = "HeroUI.Link";

/* ------------------------------------------------------------------------------------------------
 * Link Icon
 * --------------------------------------------------------------------------------------------- */
interface LinkIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const LinkIcon = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...rest
}: LinkIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof LinkIconProps<E>>) => {
  const {slots} = use(LinkContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.icon, className)}
      data-default-icon={dataAttr(!children)}
      data-slot="link-icon"
      {...(rest as any)}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </dom.span>
  );
};

LinkIcon.displayName = "HeroUI.Link.Icon";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LinkRoot, LinkIcon};

export type {LinkRootProps, LinkIconProps};
