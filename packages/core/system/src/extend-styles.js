import {cn, mapPropsVariantsWithCommon} from "@nextui-org/system";
import {forwardRef, useMemo} from "react";
import {tv} from "@nextui-org/theme";

export function extendStyles(BaseComponent, styles = {}) {
  const componentStyles = tv({
    base: styles?.base,
    variants: styles?.variants,
  });

  const ForwardedComponent = forwardRef((originalProps, ref) => {
    const [baseProps, variantProps] = mapPropsVariantsWithCommon(
      originalProps,
      componentStyles.variantKeys,
      BaseComponent.variantKeys,
    );

    const customClassname = useMemo(
      () => componentStyles(variantProps),
      [...Object.values(variantProps)],
    );

    const className = cn(customClassname, originalProps.className);

    return <BaseComponent ref={ref} {...baseProps} className={className} />;
  });

  // To make dev tools show a proper name
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;

  return ForwardedComponent;
}
