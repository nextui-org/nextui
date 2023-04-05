import {forwardRef} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
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
  | "isTextarea"
  | "startContent"
  | "endContent";

export type TextareaHeightChangeMeta = {
  rowHeight: number;
};

export interface TextAreaProps extends Omit<UseInputProps, "ref" | OmittedInputProps> {
  /**
   * Minimum number of rows to show for textarea
   * @default 3
   */
  minRows?: number;
  /**
   * Maximum number of rows up to which the textarea can grow
   * @default 6
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

const Textarea = forwardRef<TextAreaProps, "textarea">(
  (
    {style, minRows = 3, maxRows = 8, cacheMeasurements = false, onHeightChange, ...otherProps},
    ref,
  ) => {
    const {
      Component,
      label,
      description,
      shouldLabelBeOutside,
      shouldLabelBeInside,
      errorMessage,
      getBaseProps,
      getLabelProps,
      getInputProps,
      getInputWrapperProps,
      getDescriptionProps,
      getErrorMessageProps,
    } = useInput({ref, ...otherProps, isMultiline: true});

    const labelContent = <label {...getLabelProps()}>{label}</label>;
    const inputProps = getInputProps();

    return (
      <Component {...getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div {...getInputWrapperProps()}>
          {shouldLabelBeInside ? labelContent : null}
          <TextareaAutosize
            {...inputProps}
            cacheMeasurements={cacheMeasurements}
            maxRows={maxRows}
            minRows={minRows}
            style={mergeProps(inputProps.style as TextareaAutoSizeStyle, style ?? {})}
            onHeightChange={onHeightChange}
          />
        </div>
        {errorMessage ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : description ? (
          <div {...getDescriptionProps()}>{description}</div>
        ) : null}
      </Component>
    );
  },
);

Textarea.displayName = "NextUI.Textarea";

export default Textarea;
