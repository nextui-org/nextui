import React, {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";

import {useAlert, UseAlertProps} from "./use-alert";
import {AlertCloseIcon, AlertIcon} from "./alert-icons";

export interface alertProps extends UseAlertProps {}

const Alert = forwardRef<"div", alertProps>((props, ref) => {
  const {
    title,
    description,
    isCloseable,
    isVisible,
    onClose,
    domRef,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
    getCloseButtonProps,
    color,
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
      isVisible && (
        <div ref={domRef} {...getBaseProps()}>
          <AlertIcon color={color} />
          {mainWrapper}
          {isCloseable && (
            <button onClick={onClose} {...getCloseButtonProps()}>
              <AlertCloseIcon color={color} />
            </button>
          )}
        </div>
      )
    );
  }, [mainWrapper, isCloseable, getCloseButtonProps]);

  return <>{baseWrapper}</>;
});

Alert.displayName = "NextUI.Alert";

export default Alert;
