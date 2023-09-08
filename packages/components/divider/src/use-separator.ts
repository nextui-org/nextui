/*
 * Based on @react-aria/separator but with some changes to support RSC.
 */

import type {AriaLabelingProps, DOMAttributes, DOMProps, Orientation} from "@react-types/shared";

import {filterDOMProps} from "@nextui-org/react-rsc-utils";

export interface SeparatorProps extends DOMProps, AriaLabelingProps {
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation?: Orientation;
  /** The HTML element type that will be used to render the separator. */
  elementType?: string;
}

export interface SeparatorAria {
  /** Props for the separator element. */
  separatorProps: DOMAttributes;
}

/**
 * Provides the accessibility implementation for a separator.
 * A separator is a visual divider between two groups of content,
 * e.g. groups of menu items or sections of a page.
 */
export function useSeparator(props: SeparatorProps): SeparatorAria {
  let domProps = filterDOMProps(props, {
    enabled: typeof props.elementType === "string",
  });

  let ariaOrientation: Orientation | undefined;

  // if orientation is horizontal, aria-orientation default is horizontal, so we leave it undefined
  // if it's vertical, we need to specify it
  if (props.orientation === "vertical") {
    ariaOrientation = "vertical";
  }
  // hr elements implicitly have role = separator and a horizontal orientation
  if (props.elementType !== "hr") {
    return {
      separatorProps: {
        ...domProps,
        role: "separator",
        "aria-orientation": ariaOrientation,
      },
    };
  }

  return {separatorProps: domProps};
}
