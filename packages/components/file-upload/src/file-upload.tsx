import {forwardRef} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {cloneElement, useMemo, useRef, useState} from "react";

import {UseFileUploadProps, useFileUpload} from "./use-file-upload";
import {FileUploadItem} from "./file-upload-item";

export interface FileUploadProps extends UseFileUploadProps {}

const FileUpload = forwardRef<"div", FileUploadProps>((props, ref) => {
  const {
    Component,
    domRef,
    styles,
    maxItems,
    maxItemsText,
    maxAllowedSize,
    maxAllowedSizeText,
    totalMaxAllowedSize,
    totalMaxAllowedSizeText,
    browseButton,
    defaultBrowseButtonText,
    uploadButton,
    ...otherProps
  } = useFileUpload({...props, ref});

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const finalBrowseButton = useMemo(
    () =>
      browseButton ? (
        cloneElement(browseButton, {
          onClick: () => {
            inputFileRef.current?.click();
            browseButton.props.onClick?.();
          },
        })
      ) : (
        <Button onClick={() => inputFileRef.current?.click()}>{defaultBrowseButtonText}</Button>
      ),
    [browseButton, defaultBrowseButtonText],
  );

  const items = useMemo(
    () => files.map((file) => <FileUploadItem key={file.name} file={file} />),
    [files],
  );

  return (
    <Component ref={domRef} className={styles.base} {...otherProps}>
      <input
        ref={inputFileRef}
        className="hidden"
        multiple={maxItems > 1}
        type="file"
        onChange={(ev) => {
          if (!ev.target.files) return;
          const length = ev.target.files.length > maxItems ? maxItems : ev.target.files.length;

          for (let index = 0; index < length; index++) {
            const file = ev.target.files.item(index);

            file && files.push(file);
          }

          setFiles([...files]);
        }}
      />

      <div className={styles.topBar()}>
        {maxAllowedSize && (
          <span>
            {maxAllowedSizeText}: {maxAllowedSize}
          </span>
        )}
        {totalMaxAllowedSize && (
          <span>
            {totalMaxAllowedSizeText}: {totalMaxAllowedSize}
          </span>
        )}
        {maxItems > 1 && (
          <span>
            {maxItemsText}: {maxItems}
          </span>
        )}
      </div>

      <div className={styles.items()}>{items}</div>
      <div className={styles.buttons()}>
        {finalBrowseButton}
        {uploadButton}
      </div>
    </Component>
  );
});

FileUpload.displayName = "NextUI.FileUpload";

export default FileUpload;
