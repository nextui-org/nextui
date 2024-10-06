import {forwardRef} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {cloneElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {clsx} from "@nextui-org/shared-utils";

import {UseFileUploadProps, useFileUpload} from "./use-file-upload";
import {FileUploadItem} from "./file-upload-item";

export interface FileUploadProps extends UseFileUploadProps {}

const FileUpload = forwardRef<"div", FileUploadProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    files: initialFiles,
    styles,
    className,
    classNames,
    maxItems,
    browseButton,
    browseButtonText,
    addButton,
    resetButton,
    uploadButton,
    fileItemElement,
    topbar,
    onChange,
    ...otherProps
  } = useFileUpload({...props, ref});

  const inputFileRef = useRef<HTMLInputElement>(null);
  const singleInputFileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>(initialFiles ?? []);

  useEffect(() => {
    initialFiles && setFiles(initialFiles);
  }, [initialFiles]);

  const browseButtonElement = useMemo(
    () =>
      browseButton ? (
        cloneElement(browseButton, {
          onClick: () => {
            if (props.isDisabled) return;
            inputFileRef.current?.click();
            browseButton.props.onClick?.();
          },
        })
      ) : (
        <Button disabled={props.isDisabled} onClick={() => inputFileRef.current?.click()}>
          {browseButtonText}
        </Button>
      ),
    [browseButton, browseButtonText, props.isDisabled],
  );

  const updateFiles = useCallback(
    (files: File[]) => {
      setFiles(files);
      onChange?.(files);
      // Setting input values to "" in order to ignore previously-selected file(s).
      // This will fix some bugs when "removing" and re-adding "the exact same" file(s) (e.g. removing foo.txt and adding foo.txt again).
      if (inputFileRef.current) inputFileRef.current.value = "";
      if (singleInputFileRef.current) singleInputFileRef.current.value = "";
    },
    [setFiles, onChange],
  );

  const items = useMemo(
    () =>
      files.map((file) => {
        const customFileElm = fileItemElement?.(file);

        if (!customFileElm) {
          return (
            <FileUploadItem
              key={file.name}
              file={file}
              onFileRemove={(name) => {
                const newFiles = files.filter((file) => file.name !== name);

                updateFiles(newFiles);
              }}
            />
          );
        }

        return cloneElement(customFileElm, {
          key: file.name,
        });
      }),
    [files],
  );

  const addButtonElement = useMemo(
    () =>
      addButton ? (
        cloneElement(addButton, {
          onClick: () => {
            singleInputFileRef.current?.click();
            addButton.props.onClick?.();
          },
        })
      ) : (
        <Button color="secondary" onClick={() => singleInputFileRef.current?.click()}>
          Add
        </Button>
      ),
    [addButton],
  );

  const resetButtonElement = useMemo(
    () =>
      resetButton ? (
        cloneElement(resetButton, {
          onClick: () => {
            updateFiles([]);
            resetButton.props.onClick?.();
          },
        })
      ) : (
        <Button
          color="warning"
          onClick={() => {
            updateFiles([]);
          }}
        >
          Reset
        </Button>
      ),
    [resetButton, setFiles, updateFiles],
  );

  const topbarElement = useMemo(() => {
    if (topbar) {
      return cloneElement(topbar, {
        className: topbarStyles,
      });
    }
  }, [topbar]);

  const baseStyles = styles.base({class: clsx(classNames?.base, className)});
  const topbarStyles = styles.base({class: clsx(classNames?.topbar, topbar?.props.className)});

  return (
    <Component ref={domRef} className={baseStyles} {...otherProps}>
      <input
        ref={inputFileRef}
        className="hidden"
        multiple={maxItems > 1}
        title="file upload"
        type="file"
        onChange={(ev) => {
          if (!ev.target.files?.length) return;
          const length = ev.target.files.length > maxItems ? maxItems : ev.target.files.length;
          const newFiles: File[] = [];

          for (let index = 0; index < length; index++) {
            const file = ev.target.files.item(index);

            file && newFiles.push(file);
          }
          updateFiles(newFiles);
        }}
      />

      <input
        ref={singleInputFileRef}
        className="hidden"
        title="single file upload"
        type="file"
        onChange={(ev) => {
          const singleFile = ev.target.files?.item(0);

          if (!singleFile) return;
          if (files.find((file) => file.name === singleFile.name)) return;
          files.push(singleFile);
          updateFiles([...files]);
        }}
      />

      {topbarElement}

      <div className={styles.items()}>
        {children}
        {items}
      </div>
      <div className={styles.buttons()}>
        {maxItems > 1 && files.length !== 0 && files.length < maxItems && addButtonElement}
        {files.length !== 0 && resetButtonElement}
        {browseButtonElement}
        {uploadButton}
      </div>
    </Component>
  );
});

FileUpload.displayName = "NextUI.FileUpload";

export default FileUpload;
