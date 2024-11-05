import {Button} from "@nextui-org/button";
import {HTMLNextUIProps} from "@nextui-org/system";
import {CloseIcon} from "@nextui-org/shared-icons";

export interface FileUploadItemProps extends HTMLNextUIProps<"div"> {
  file: File;
  onFileRemove: (name: string) => void;
  isDisabled?: boolean;
}

const FileUploadItem: React.FC<FileUploadItemProps> = ({
  file,
  onFileRemove,
  isDisabled,
  ...otherProps
}) => {
  return (
    <div {...otherProps}>
      <Button isDisabled={isDisabled} onClick={() => onFileRemove(file.name)}>
        <CloseIcon />
      </Button>
      <span>{file.name}</span>
      <span>{file.size}</span>
      <span>{file.type}</span>
    </div>
  );
};

FileUploadItem.displayName = "NextUI.FileUploadItem";

export default FileUploadItem;
