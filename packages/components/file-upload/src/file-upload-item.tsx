import {Button} from "@nextui-org/button";
import {HTMLNextUIProps} from "@nextui-org/system";
import {CloseIcon} from "@nextui-org/shared-icons";

export interface FileUploadItemProps extends HTMLNextUIProps<"div"> {
  file: File;
  onFileRemove: (file: File) => void;
  isDisabled?: boolean;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const FileUploadItem: React.FC<FileUploadItemProps> = ({
  file,
  onFileRemove,
  isDisabled,
  ...otherProps
}) => {
  return (
    <div {...otherProps}>
      <Button
        aria-label={`Remove ${file.name}`}
        isDisabled={isDisabled}
        role="listitem"
        onClick={() => onFileRemove(file)}
      >
        <CloseIcon />
      </Button>
      <span>{file.name}</span>
      <span>{formatFileSize(file.size)}</span>
      <span>{file.type.split("/").at(1)?.toUpperCase()}</span>
    </div>
  );
};

FileUploadItem.displayName = "NextUI.FileUploadItem";

export default FileUploadItem;
