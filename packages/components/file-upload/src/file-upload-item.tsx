import {Button} from "@nextui-org/button";
import {HTMLNextUIProps} from "@nextui-org/system";
import {CloseIcon} from "@nextui-org/shared-icons";

export interface FileUploadItemProps extends HTMLNextUIProps<"div"> {
  file: File;
  onFileRemove: (name: string) => void;
}

export const FileUploadItem: React.FC<FileUploadItemProps> = ({
  file,
  onFileRemove,
  ...otherProps
}) => {
  return (
    <div {...otherProps}>
      <Button onClick={() => onFileRemove(file.name)}>
        <CloseIcon />
      </Button>
      <span>{file.name}</span>
      <span>{file.size}</span>
      <span>{file.type}</span>
    </div>
  );
};
