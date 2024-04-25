import {dataAttr} from "@nextui-org/shared-utils";
import {forwardRef} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {useMemo, useState} from "react";
import TextareaAutosize from "react-textarea-autosize";

import {UseInputProps, useInput} from "./use-input";

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type TextareaAutoSizeStyle = Omit<
  NonNullable<NativeTextareaProps["style"]>,
  "maxHeight" | "minHeight"
> & {
  height?: number;
};

type OmittedInputProps =
  | "isClearButtonFocusVisible"
  | "isLabelPlaceholder"
  | "isClearable"
  | "isTextarea";

export type TextareaHeightChangeMeta = {
  rowHeight: number;
};

export interface TextAreaProps extends Omit<UseInputProps<HTMLTextAreaElement>, OmittedInputProps> {
  /**
   * Whether the textarea should automatically grow vertically to accomodate content.
   * @default false
   */
  disableAutosize?: boolean;
  /**
   * Minimum number of rows to show for textarea
   * @default 3
   */
  minRows?: number;
  /**
   * Maximum number of rows up to which the textarea can grow
   * @default 8
   */
  maxRows?: number;
  /**
   * Reuse previously computed measurements when computing height of textarea.
   * @default false
   */
  cacheMeasurements?: boolean;
  /**
   * Function invoked on textarea height change, with height as first argument.
   * The second function argument is an object containing additional information that
   * might be useful for custom behaviors. Current options include `{ rowHeight: number }`.
   *
   * @param height - The height of the textarea
   * @param meta - Additional information about the height change
   */
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
}

const Textarea = forwardRef<"textarea", TextAreaProps>(
  (
    {
      style,
      minRows = 3,
      maxRows = 8,
      cacheMeasurements = false,
      disableAutosize = false,
      onHeightChange,
      ...otherProps
    },
    ref,
  ) => {
    const {
      Component,
      label,
      description,
      startContent,
      endContent,
      hasHelper,
      shouldLabelBeOutside,
      shouldLabelBeInside,
      isInvalid,
      errorMessage,
      getBaseProps,
      getLabelProps,
      getInputProps,
      getInnerWrapperProps,
      getInputWrapperProps,
      getHelperWrapperProps,
      getDescriptionProps,
      getErrorMessageProps,
    } = useInput<HTMLTextAreaElement>({...otherProps, ref, isMultiline: true});

    const [hasMultipleRows, setIsHasMultipleRows] = useState(minRows > 1);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;
    const inputProps = getInputProps();

    const handleHeightChange = (height: number, meta: TextareaHeightChangeMeta) => {
      if (minRows === 1) {
        setIsHasMultipleRows(height >= meta.rowHeight * 2);
      }
      if (maxRows > minRows) {
        const limitReached = height >= maxRows * meta.rowHeight;

        setIsLimitReached(limitReached);
      }

      onHeightChange?.(height, meta);
    };

    const content = disableAutosize ? (
      <textarea {...inputProps} style={mergeProps(inputProps.style, style ?? {})} />
    ) : (
      <TextareaAutosize
        {...inputProps}
        cacheMeasurements={cacheMeasurements}
        data-hide-scroll={dataAttr(!isLimitReached)}
        maxRows={maxRows}
        minRows={minRows}
        style={mergeProps(inputProps.style as TextareaAutoSizeStyle, style ?? {})}
        onHeightChange={handleHeightChange}
      />
    );

    const innerWrapper = useMemo(() => {
      if (startContent || endContent) {
        return (
          <div {...getInnerWrapperProps()}>
            {startContent}
            {content}
            {endContent}
          </div>
        );
      }

      return <div {...getInnerWrapperProps()}>{content}</div>;
    }, [startContent, inputProps, endContent, getInnerWrapperProps]);

    return (
      <Component {...getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div {...getInputWrapperProps()} data-has-multiple-rows={dataAttr(hasMultipleRows)}>
          {shouldLabelBeInside ? labelContent : null}
          {innerWrapper}
        </div>
        {hasHelper ? (
          <div {...getHelperWrapperProps()}>
            {isInvalid && errorMessage ? (
              <div {...getErrorMessageProps()}>{errorMessage}</div>
            ) : description ? (
              <div {...getDescriptionProps()}>{description}</div>
            ) : null}
          </div>
        ) : null}
      </Component>
    );
  },
);

Textarea.displayName = "NextUI.Textarea";

export default Textarea;
