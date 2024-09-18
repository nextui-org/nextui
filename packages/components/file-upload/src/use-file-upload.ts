import type {FileUploadVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {fileUpload} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";
import {ReactElement, useMemo} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * If a different browse button is needed.
   */
  browseButton?: ReactElement;
  /**
   * A different text for the default browse button.
   */
  defaultBrowseButtonText?: string;
  /**
   * If an uplaod button is needed.
   */
  uploadButton?: ReactElement;
  /**
   * Max number of items.
   * @default 1
   */
  maxItems: number;
  /**
   * Max number of items text.
   * @default  "Max number of items"
   */
  maxItemsText?: number;
  /**
   * Max file size allowed.
   */
  maxAllowedSize?: string;
  /**
   * Total max size allowed for multiple files combined.
   */
  totalMaxAllowedSize?: string;
  /**
   * Max file size text.
   * @default "Max File Size"
   */
  maxAllowedSizeText?: string;
  /**
   * Total max file size text.
   * @default "Total Max Files Size"
   */
  totalMaxAllowedSizeText?: string;
}

export type UseFileUploadProps = Props & FileUploadVariantProps;

export function useFileUpload(originalProps: UseFileUploadProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, fileUpload.variantKeys);

  const {
    ref,
    as,
    className,
    maxItems,
    maxItemsText = "Max number of items",
    maxAllowedSizeText = "Max File Size",
    totalMaxAllowedSizeText = "Total Max Files Size",
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      fileUpload({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  return {
    Component,
    styles,
    domRef,
    maxItems,
    maxItemsText,
    maxAllowedSizeText,
    totalMaxAllowedSizeText,
    ...otherProps,
  };
}

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;
