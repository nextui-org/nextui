import {forwardRef} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {cloneElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {clsx} from "@nextui-org/shared-utils";

import {UseFileUploadProps, useFileUpload} from "./use-file-upload";
import FileUploadItem from "./file-upload-item";

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
    multiple,
    browseButton,
    browseButtonText,
    addButton,
    resetButton,
    uploadButton,
    buttons,
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

  const topbarElement = useMemo(() => {
    if (topbar) {
      return cloneElement(topbar, {
        className: styles.topbar({class: clsx(classNames?.topbar, topbar?.props.className)}),
      });
    }
  }, [styles, classNames, topbar]);

  const items = useMemo(
    () =>
      files.map((file) => {
        if (!fileItemElement) {
          return (
            <FileUploadItem
              key={file.name}
              className={styles.item()}
              file={file}
              onFileRemove={(name) => {
                if (props.isDisabled) return;
                const newFiles = files.filter((file) => file.name !== name);

                updateFiles(newFiles);
              }}
            />
          );
        }

        const customFileElm = fileItemElement(file);

        return cloneElement(customFileElm, {
          key: file.name,
          className: styles.item({class: clsx(classNames?.item, customFileElm.props.className)}),
        });
      }),
    [styles, classNames, files, fileItemElement, updateFiles],
  );

  const onBrowse = useCallback(() => {
    if (props.isDisabled) return;
    inputFileRef.current?.click();
  }, [props.isDisabled]);

  const onAdd = useCallback(() => {
    if (props.isDisabled) return;
    singleInputFileRef.current?.click();
  }, [props.isDisabled]);

  const onReset = useCallback(() => {
    if (props.isDisabled) return;
    updateFiles([]);
  }, [props.isDisabled]);

  const browseButtonElement = useMemo(
    () =>
      browseButton ? (
        cloneElement(browseButton, {
          disabled: props.isDisabled,
          onClick: (ev) => {
            onBrowse();
            browseButton.props.onClick?.(ev);
          },
        })
      ) : (
        <Button disabled={props.isDisabled} onClick={() => onBrowse()}>
          {browseButtonText}
        </Button>
      ),
    [browseButton, browseButtonText, onBrowse, props.isDisabled],
  );

  const addButtonElement = useMemo(
    () =>
      addButton ? (
        cloneElement(addButton, {
          disabled: props.isDisabled,
          onClick: (ev) => {
            onAdd();
            addButton.props.onClick?.(ev);
          },
        })
      ) : (
        <Button color="secondary" disabled={props.isDisabled} onClick={() => onAdd()}>
          Add
        </Button>
      ),
    [addButton, onAdd],
  );

  const resetButtonElement = useMemo(
    () =>
      resetButton ? (
        cloneElement(resetButton, {
          disabled: props.isDisabled,
          onClick: (ev) => {
            onReset();
            resetButton.props.onClick?.(ev);
          },
        })
      ) : (
        <Button
          color="warning"
          disabled={props.isDisabled}
          onClick={() => {
            onReset();
          }}
        >
          Reset
        </Button>
      ),
    [resetButton, onReset],
  );

  const buttonsElement = useMemo(() => {
    if (!buttons) {
      const uploadButtonElement =
        uploadButton && cloneElement(uploadButton, {disabled: props.isDisabled});

      return (
        <div className={styles.buttons()}>
          {multiple && files.length !== 0 && addButtonElement}
          {files.length !== 0 && resetButtonElement}
          {browseButtonElement}
          {uploadButtonElement}
        </div>
      );
    }

    const customButtonsElement = buttons(onBrowse, onAdd, onReset);

    return cloneElement(customButtonsElement, {
      className: styles.buttons({
        class: clsx(classNames?.buttons, customButtonsElement.props.className),
      }),
    });
  }, [
    onBrowse,
    onAdd,
    onReset,
    styles,
    multiple,
    files,
    browseButtonElement,
    addButtonElement,
    resetButtonElement,
    uploadButton,
  ]);

  const baseStyles = styles.base({class: clsx(classNames?.base, className)});

  return (
    <Component ref={domRef} className={baseStyles} {...otherProps}>
      <input
        ref={inputFileRef}
        className="hidden"
        multiple={multiple}
        title="file upload"
        type="file"
        onChange={(ev) => {
          if (!ev.target.files?.length) return;
          const newFiles: File[] = [];

          for (let index = 0; index < ev.target.files.length; index++) {
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

      {buttonsElement}
    </Component>
  );
});

FileUpload.displayName = "NextUI.FileUpload";

export default FileUpload;
