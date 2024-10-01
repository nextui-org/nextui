import type {FileUploadVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {fileUpload} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";
import {ReactElement, useMemo} from "react";

type FileSize = `${number} KB` | `${number} MB`;

interface Props extends Omit<HTMLNextUIProps<"div">, "onChange"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * A property to set initial files (which might be fetched) or to control files from outside of the component.
   */
  files?: File[];
  /**
   * If a different browse button is needed.
   */
  browseButton?: ReactElement;
  /**
   * A different text for the browse button.
   */
  browseButtonText?: string;
  /**
   * Custom Add Button.
   */
  addButton?: ReactElement;
  /**
   * Custom Reset Button.
   */
  resetButton?: ReactElement;
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
  maxItemsText?: string;
  /**
   * Custom Element to show Max number of items.
   */
  maxItemsElement?: ReactElement;
  /**
   * Max file size allowed.
   */
  maxAllowedSize?: FileSize;
  /**
   * Max file size text.
   * @default "Max File Size"
   */
  maxAllowedSizeText?: string;
  /**
   * Custom Element to show Max file size.
   */
  maxAllowedSizeElement?: ReactElement;
  /**
   * Total max size allowed for multiple files combined.
   */
  totalMaxAllowedSize?: FileSize;
  /**
   * Total max file size text.
   * @default "Total Max Files Size"
   */
  totalMaxAllowedSizeText?: string;
  /**
   * Custom Element to show Total Max file size.
   */
  totalMaxAllowedSizeElement?: ReactElement;
  /**
   * Custom Element for an Upload File Item.
   */
  fileItemElement?: (file: File) => ReactElement;
  /**
   * Triggered when file(s) selected, added or removed.
   */
  onChange?: (files: File[]) => void;
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
    browseButtonText = "Browse",
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
    browseButtonText,
    ...otherProps,
  };
}

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;
