"use client";

import type {ComponentType, ForwardedRef, ReactElement, ReactNode} from "react";

import React, {Children, createContext, forwardRef, isValidElement, useContext} from "react";

import {Logger} from "./logger";

const logger = new Logger({prefix: "HeroUI"});

/** Dev-only registry for duplicate slot name warnings. */
let registry: Set<string> | undefined;

const __DEV__ = typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production";

/**
 * Create a CollectionBuilder-safe slot for optional chrome around a RAC collection
 * target (e.g. TabList, ListBox).
 *
 * The injector emits no host DOM: chrome props are provided via Context and a
 * string-keyed `cloneElement` channel (React strips Symbol keys from element props).
 * The target should apply chrome through the RAC `render` prop — not by wrapping
 * the collection child in a host node.
 */
export const createCollectionSlot = <T extends object>(name: string) => {
  if (__DEV__) {
    registry ??= new Set<string>();

    if (registry.has(name)) {
      logger.warn(
        `Duplicate collection slot "${name}". Use a unique, namespaced name (e.g. "tabs.listContainer", "menu.popover").`,
      );
    }

    registry.add(name);
  }

  // String key required — React drops Symbol keys from element props / cloneElement.
  const key = `$$heroui.collection.${name}`;
  const SlotContext = createContext<T | undefined>(undefined);

  const inject = (children: ReactNode, value: T): ReactNode => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      return React.cloneElement(child as ReactElement<Record<string, unknown>>, {
        [key]: value,
      });
    });
  };

  const consume = <P extends object>(props: P): [injected: T | undefined, rest: P] => {
    const {[key]: injected, ...rest} = props as P & Record<string, T | undefined>;

    return [injected, rest as P];
  };

  const useSlot = <P extends object>(props: P): [injected: T | undefined, rest: P] => {
    const [fromProps, rest] = consume(props);
    const fromContext = useContext(SlotContext);

    return [fromProps ?? fromContext, rest];
  };

  const Injector = ({children, ...value}: {children?: ReactNode} & T) => {
    return (
      <SlotContext.Provider value={value as T}>{inject(children, value as T)}</SlotContext.Provider>
    );
  };

  Injector.displayName = `HeroUI.CollectionSlot(${name})`;

  type WithSlotProps<P> = P & {children?: ReactNode};

  const withSlot = <P extends object>(
    Primitive: ComponentType<WithSlotProps<P>>,
    defaultRender?: (
      props: WithSlotProps<P>,
      injected: T,
      forwardedRef: ForwardedRef<unknown>,
    ) => ReactElement,
  ) => {
    const Wrapped = forwardRef<unknown, WithSlotProps<P>>(
      function CollectionSlotTarget(props, forwardedRef) {
        const [injected, rest] = useSlot(props);
        const {children, ...restProps} = rest;

        if (!injected) {
          return (
            <Primitive {...(restProps as P)} ref={forwardedRef as never}>
              {children}
            </Primitive>
          );
        }

        if (defaultRender) {
          // Forward ref into chrome factory; `.current` is not read here.
          return defaultRender({...(restProps as P), children}, injected, forwardedRef);
        }

        const {
          className: containerClassName,
          render: customRender,
          ...containerRest
        } = injected as T & {
          className?: string;
          render?: (props: Record<string, unknown>) => ReactElement;
        };

        return (
          <Primitive {...(restProps as P)} ref={forwardedRef as never}>
            {customRender ? (
              customRender({children, className: containerClassName, ...containerRest})
            ) : (
              <div
                className={containerClassName}
                data-slot={`${name}-container`}
                {...containerRest}
              >
                {children}
              </div>
            )}
          </Primitive>
        );
      },
    );

    Wrapped.displayName = `HeroUI.withCollectionSlot(${Primitive.displayName || Primitive.name || name})`;

    return Wrapped;
  };

  return {
    key,
    inject,
    consume,
    useSlot,
    Injector,
    withSlot,
    Context: SlotContext,
  } as const;
};

export type CollectionSlot<T extends object> = ReturnType<typeof createCollectionSlot<T>>;
