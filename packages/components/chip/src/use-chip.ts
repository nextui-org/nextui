import type {ChipVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {chip} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseChipProps extends HTMLNextUIProps<"div">, ChipVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Element to be rendered in the left side of the chip.
   */
  leftContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the chip.
   */
  rightContent?: React.ReactNode;
}

export function useChip(originalProps: UseChipProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, chip.variantKeys);

  const {ref, as, children, className, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      chip({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const getChipProps = () => {
    return {
      ref: domRef,
      className: styles,
      ...otherProps,
    };
  };

  return {
    Component,
    children,
    getChipProps,
  };
}

export type UseChipReturn = ReturnType<typeof useChip>;
