import * as React from "react";
import {tv} from "@nextui-org/theme";
import clsx from "clsx";

import {mapPropsVariants} from "./utils";

function getSlots(variants) {
  return variants
    ? Object.values(variants)
        .flatMap(Object.values)
        .reduce((acc, slot) => {
          if (typeof slot === "object" && slot !== null && !(slot instanceof String)) {
            Object.keys(slot).forEach((key) => {
              if (!acc.hasOwnProperty(key)) {
                acc[key] = "";
              }
            });
          }

          return acc;
        }, {})
    : {};
}

function getClassNamesWithProps({
  props = {},
  variants,
  slots,
  defaultVariants,
  compoundVariants,
  hasSlots,
  opts,
}) {
  // Do not apply default variants when the props variant is different
  if (defaultVariants && typeof defaultVariants === "object") {
    for (const key in defaultVariants) {
      const value = defaultVariants[key];
      const propValue = props?.[key];

      if (propValue && propValue !== value) {
        delete defaultVariants[key];
      }
    }
  }

  const customTv = tv(
    {
      variants,
      defaultVariants,
      compoundVariants,
      ...(hasSlots && {slots}),
    },
    {
      twMerge: opts.twMerge ?? true,
      twMergeConfig: opts.twMergeConfig ?? {},
    },
  );

  const [baseProps, variantProps] = mapPropsVariants(props, customTv.variantKeys, false);

  const newProps = {...defaultVariants, ...baseProps};

  let classNames = {};

  const result = customTv(variantProps);

  // if no slots, the result is a string
  if (!hasSlots) {
    newProps.className = clsx(result, props.className);
  }
  // if has slots, the result is an object with keys as slots functions
  else {
    Object.entries(result).forEach(([key, value]) => {
      const slotResult = value();

      if (typeof slotResult === "string") {
        classNames[key] = slotResult;
      }
    });

    Object.entries(props.classNames ?? {}).forEach(([key, value]) => {
      classNames[key] = clsx(classNames[key], value);
    });
  }

  if (Object.keys(classNames).length !== 0) {
    newProps.classNames = classNames;
  }

  return newProps;
}

export function extendVariants(BaseComponent, styles = {}, opts = {}) {
  const {variants, defaultVariants, compoundVariants} = styles || {};

  const slots = getSlots(variants);
  const hasSlots = typeof slots === "object" && Object.keys(slots).length !== 0;

  const ForwardedComponent = React.forwardRef((originalProps = {}, ref) => {
    const newProps = React.useMemo(() =>
      getClassNamesWithProps(
        {
          slots,
          variants,
          compoundVariants,
          props: originalProps,
          defaultVariants,
          hasSlots,
          opts,
        },
        [originalProps],
      ),
    );

    return React.createElement(BaseComponent, {...originalProps, ...newProps, ref});
  });

  // Add collection node function for collection-based components
  if (BaseComponent.getCollectionNode) {
    ForwardedComponent.getCollectionNode = (itemProps) => {
      const newProps = getClassNamesWithProps({
        slots,
        variants,
        compoundVariants,
        props: itemProps,
        defaultVariants,
        hasSlots,
        opts,
      });

      return BaseComponent.getCollectionNode({...itemProps, ...newProps});
    };
  }

  // To make dev tools show a proper name
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;

  return ForwardedComponent;
}
