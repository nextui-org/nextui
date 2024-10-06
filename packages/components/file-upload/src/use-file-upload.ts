import type {FileUploadSlots, FileUploadVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {fileUpload} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";
import {ReactElement, useMemo} from "react";

interface Props extends Omit<HTMLNextUIProps<"div">, "onChange"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  classNames?: SlotsToClasses<FileUploadSlots>;
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
   * Custom Element for an Upload File Item.
   */
  fileItemElement?: (file: File) => ReactElement<HTMLElement>;
  /**
   * Custom Element for topbar of the component.
   */
  topbar?: ReactElement<HTMLElement>;
  /**
   * Triggered when file(s) selected, added or removed.
   */
  onChange?: (files: File[]) => void;
}

export type UseFileUploadProps = Props & FileUploadVariantProps;

export function useFileUpload(originalProps: UseFileUploadProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, fileUpload.variantKeys);

  const {ref, as, className, maxItems = 1, browseButtonText = "Browse", ...otherProps} = props;

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
    className,
    maxItems,
    browseButtonText,
    ...otherProps,
  };
}

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;
