import * as React from "react";
import {tv} from "@nextui-org/theme";

import {cn, mapPropsVariants} from "./utils";

export function extendVariants(BaseComponent, styles = {}) {
  const {variants, defaultVariants, compoundVariants} = styles || {};

  const customTv = tv({
    variants,
    defaultVariants,
    compoundVariants,
  });

  const ForwardedComponent = React.forwardRef((originalProps, ref) => {
    const [baseProps, variantProps] = mapPropsVariants(originalProps, customTv.variantKeys, false);

    const customClassname = React.useMemo(
      () => customTv(variantProps),
      [...Object.values(variantProps)],
    );

    const className = cn(customClassname, originalProps.className);

    const newProps = {...baseProps, ...defaultVariants, ref, className};

    return React.createElement(BaseComponent, newProps);
  });

  // To make dev tools show a proper name
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;

  return ForwardedComponent;
}
