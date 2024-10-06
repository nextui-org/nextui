import type {FileUploadSlots, FileUploadVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {fileUpload} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";
import {ReactHTMLElement, useMemo} from "react";

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
   * Custom Browse Button.
   */
  browseButton?: ReactHTMLElement<HTMLButtonElement>;
  /**
   * A different text for the browse button.
   */
  browseButtonText?: string;
  /**
   * Custom Add Button.
   */
  addButton?: ReactHTMLElement<HTMLButtonElement>;
  /**
   * Custom Reset Button.
   */
  resetButton?: ReactHTMLElement<HTMLButtonElement>;
  /**
   * Custom Upload Button.
   */
  uploadButton?: ReactHTMLElement<HTMLButtonElement>;
  /**
   * Custom element to display buttons such as the browse button in customized design and order.
   */
  buttons?: (
    onBrowse: () => void,
    onAdd: () => void,
    onReset: () => void,
  ) => ReactHTMLElement<HTMLElement>;
  /**
   * If set to true, multiple files can be selected from the device.
   * @default false
   */
  multiple?: boolean;
  /**
   * Custom Element for an Upload File Item.
   */
  fileItemElement?: (file: File) => ReactHTMLElement<HTMLElement>;
  /**
   * Custom Element for topbar of the component.
   */
  topbar?: ReactHTMLElement<HTMLElement>;
  /**
   * Triggered when file(s) selected, added or removed.
   */
  onChange?: (files: File[]) => void;
}

export type UseFileUploadProps = Props & FileUploadVariantProps;

export function useFileUpload(originalProps: UseFileUploadProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, fileUpload.variantKeys);

  const {ref, as, className, multiple = false, browseButtonText = "Browse", ...otherProps} = props;

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
    multiple,
    browseButtonText,
    ...otherProps,
  };
}

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;
