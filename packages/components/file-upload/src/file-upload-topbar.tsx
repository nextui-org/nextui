import {HTMLNextUIProps} from "@nextui-org/system";
import {ReactElement} from "react";

type FileSize = `${number} KB` | `${number} MB`;

export interface FileUploadTopbarProps extends HTMLNextUIProps<"div"> {
  /**
   * Max number of items.
   * @default 1
   */
  maxItems?: number;
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
}

const FileUploadTopbar: React.FC<FileUploadTopbarProps> = ({
  maxItemsText = "Max number of items",
  maxAllowedSizeText = "Max File Size",
  totalMaxAllowedSizeText = "Total Max Files Size",
  maxItems = 1,
  maxItemsElement,
  maxAllowedSize,
  maxAllowedSizeElement,
  totalMaxAllowedSize,
  totalMaxAllowedSizeElement,
  ...otherProps
}) => {
  return (
    <div {...otherProps}>
      {maxItems > 1 &&
        (maxItemsElement ?? (
          <span>
            {maxItemsText}: {maxItems}
          </span>
        ))}
      {maxAllowedSize &&
        (maxAllowedSizeElement ?? (
          <span>
            {maxAllowedSizeText}: {maxAllowedSize}
          </span>
        ))}
      {totalMaxAllowedSize &&
        (totalMaxAllowedSizeElement ?? (
          <span>
            {totalMaxAllowedSizeText}: {totalMaxAllowedSize}
          </span>
        ))}
    </div>
  );
};

FileUploadTopbar.displayName = "NextUI.FileUploadTopbar";

export default FileUploadTopbar;
