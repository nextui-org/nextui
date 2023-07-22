import * as React from "react";
import {tv} from "@nextui-org/theme";

import {cn, mapPropsVariantsWithCommon} from "./utils";

export function extendStyles(BaseComponent, styles = {}) {
  const componentStyles = tv({
    base: styles?.base,
    variants: styles?.variants,
  });

  const ForwardedComponent = React.forwardRef((originalProps, ref) => {
    const [baseProps, variantProps] = mapPropsVariantsWithCommon(
      originalProps,
      componentStyles.variantKeys,
      BaseComponent.variantKeys,
    );

    const customClassname = React.useMemo(
      () => componentStyles(variantProps),
      [...Object.values(variantProps)],
    );

    const className = cn(customClassname, originalProps.className);

    const newProps = {...baseProps, ref, className};

    return React.createElement(BaseComponent, newProps);
  });

  // To make dev tools show a proper name
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;

  return ForwardedComponent;
}
