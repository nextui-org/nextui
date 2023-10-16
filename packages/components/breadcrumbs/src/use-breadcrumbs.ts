import type {BreadcrumbsVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {breadcrumbs} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export type UseBreadcrumbsProps = Props & BreadcrumbsVariantProps;

export function useBreadcrumbs(originalProps: UseBreadcrumbsProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, breadcrumbs.variantKeys);

  const {ref, as, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      breadcrumbs({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  return {Component, styles, domRef, ...otherProps};
}

export type UseBreadcrumbsReturn = ReturnType<typeof useBreadcrumbs>;
