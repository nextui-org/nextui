import {HTMLNextUIProps} from "@nextui-org/system";

export interface FileUploadItemProps extends HTMLNextUIProps<"div"> {
  file: File;
}

export const FileUploadItem: React.FC<FileUploadItemProps> = ({file, ...otherProps}) => {
  return (
    <div className="flex gap-4 my-4" {...otherProps}>
      <span>{file.name}</span>
      <span>{file.size}</span>
      <span>{file.type}</span>
    </div>
  );
};
