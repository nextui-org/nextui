import type {FileUploadVariantProps} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {fileUpload} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export type UseFileUploadItemProps = Props & FileUploadVariantProps;

export function useFileUpload(originalProps: UseFileUploadItemProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, fileUpload.variantKeys);

  const {ref, as, className, ...otherProps} = props;

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

  return {Component, styles, domRef, ...otherProps};
}

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;
