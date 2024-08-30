import React, {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {CloseIcon} from "@nextui-org/shared-icons";

import {useAlert, UseAlertProps} from "./use-alert";

export interface alertProps extends UseAlertProps {}

const Alert = forwardRef<"div", alertProps>((props, ref) => {
  const {
    title,
    description,
    isCloseable,
    startContent,
    endContent,
    visible,
    handleClose,
    domRef,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
    getCloseButtonProps,
  } = useAlert({...props, ref});

  const mainWrapper = useMemo(() => {
    return (
      <div {...getMainWrapperProps()}>
        <div {...getTitleProps()}>{title}</div>
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [title, description, getMainWrapperProps, getTitleProps, getDescriptionProps]);

  const baseWrapper = useMemo(() => {
    return (
      visible && (
        <div ref={domRef} {...getBaseProps()}>
          {startContent}
          {mainWrapper}
          {endContent}
          {isCloseable && (
            <button onClick={handleClose} {...getCloseButtonProps()}>
              <CloseIcon />
            </button>
          )}
        </div>
      )
    );
  }, [startContent, endContent, mainWrapper, isCloseable, getCloseButtonProps]);

  return <>{baseWrapper}</>;
});

Alert.displayName = "NextUI.Alert";

export default Alert;
