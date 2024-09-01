import React, {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {CloseIcon} from "@nextui-org/shared-icons";

import {useAlert, UseAlertProps} from "./use-alert";
import {DangerIcon, InfoBoldIcon, SuccessIcon, WarningIcon} from "./alert-icons";

export interface alertProps extends UseAlertProps {}

const AlertIcon = (props: {color: string}) => {
  switch (props.color) {
    case "success":
      return <SuccessIcon />;
    case "warning":
      return <WarningIcon />;
    case "danger":
      return <DangerIcon />;
    default:
      return <InfoBoldIcon color={props.color} />;
  }
};

const closeIconColor = (color: string) => {
  switch (color) {
    case "primary":
      return "#004493";
    case "secondary":
      return "#481878";
    case "success":
      return "#0E793C";
    case "warning":
      return "#936316";
    case "danger":
      return "#920B3A";
    default:
      return "#71717A";
  }
};

const Alert = forwardRef<"div", alertProps>((props, ref) => {
  const {
    title,
    description,
    isCloseable,
    visible,
    handleClose,
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
      visible && (
        <div ref={domRef} {...getBaseProps()}>
          <AlertIcon color={color} />
          {mainWrapper}
          {isCloseable && (
            <button onClick={handleClose} {...getCloseButtonProps()}>
              <CloseIcon color={closeIconColor(color)} height={20} width={20} />
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
