/*
 * This file is copied from https://github.dev/adobe/react-spectrum/blob/2d4521098a3b4999f2e98b4d52d22483ee3451c8/packages/react-aria-components/src/utils.ts
 * We copied this internally to avoid installing the complete react-aria-components package.
 */

import type {CSSProperties, ForwardedRef, ReactNode} from "react";

import {Context, useContext, useMemo} from "react";
import {RefObject, DOMProps as SharedDOMProps} from "@react-types/shared";
import {mergeProps, mergeRefs, useObjectRef} from "@react-aria/utils";
export const DEFAULT_SLOT = Symbol("default");

interface SlottedValue<T> {
  slots?: Record<string | symbol, T>;
}

export type WithRef<T, E> = T & {ref?: ForwardedRef<E>};
export type SlottedContextValue<T> = SlottedValue<T> | T | null | undefined;
export type ContextValue<T, E> = SlottedContextValue<WithRef<T, E>>;

export interface StyleProps {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. */
  className?: string;
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. */
  style?: CSSProperties;
}

export interface DOMProps extends StyleProps, SharedDOMProps {
  /** The children of the component. */
  children?: ReactNode;
}

export interface SlotProps {
  /**
   * A slot name for the component. Slots allow the component to receive props from a parent component.
   * An explicit `null` value indicates that the local props completely override all props received from a parent.
   */
  slot?: string | null;
}

export function useSlottedContext<T>(
  context: Context<SlottedContextValue<T>>,
  slot?: string | null,
): T | null | undefined {
  let ctx = useContext(context);

  if (slot === null) {
    // An explicit `null` slot means don't use context.
    return null;
  }
  if (ctx && typeof ctx === "object" && "slots" in ctx && ctx.slots) {
    let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map((p) => `"${p}"`));

    if (!slot && !ctx.slots[DEFAULT_SLOT]) {
      throw new Error(`A slot prop is required. Valid slot names are ${availableSlots}.`);
    }
    let slotKey = slot || DEFAULT_SLOT;

    if (!ctx.slots[slotKey]) {
      // @ts-ignore
      throw new Error(`Invalid slot "${slot}". Valid slot names are ${availableSlots}.`);
    }

    return ctx.slots[slotKey];
  }

  // @ts-ignore
  return ctx;
}

export function useContextProps<T, U extends SlotProps, E extends Element>(
  props: T & SlotProps,
  ref: ForwardedRef<E>,
  context: Context<ContextValue<U, E>>,
): [T, RefObject<E | null>] {
  let ctx = useSlottedContext(context, props.slot) || {};
  // @ts-ignore - TS says "Type 'unique symbol' cannot be used as an index type." but not sure why.
  let {ref: contextRef, ...contextProps} = ctx as any;
  let mergedRef = useObjectRef(useMemo(() => mergeRefs(ref, contextRef), [ref, contextRef]));
  let mergedProps = mergeProps(contextProps, props) as unknown as T;

  // mergeProps does not merge `style`. Adding this there might be a breaking change.
  if ("style" in contextProps && contextProps.style && "style" in props && props.style) {
    if (typeof contextProps.style === "function" || typeof props.style === "function") {
      // @ts-ignore
      mergedProps.style = (renderProps) => {
        let contextStyle =
          typeof contextProps.style === "function"
            ? contextProps.style(renderProps)
            : contextProps.style;
        let defaultStyle = {...renderProps.defaultStyle, ...contextStyle};
        let style =
          typeof props.style === "function"
            ? props.style({...renderProps, defaultStyle})
            : props.style;

        return {...defaultStyle, ...style};
      };
    } else {
      // @ts-ignore
      mergedProps.style = {...contextProps.style, ...props.style};
    }
  }

  return [mergedProps, mergedRef];
}
