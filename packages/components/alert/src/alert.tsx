import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {CloseIcon} from "@nextui-org/shared-icons";

import {useAlert, UseAlertProps} from "./use-alert";
import {AlertIcon} from "./alert-icons";

export interface AlertProps extends UseAlertProps {}

const Alert = forwardRef<"div", AlertProps>((props, ref) => {
  const {
    title,
    description,
    isClosable,
    domRef,
    handleClose,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
    getCloseButtonProps,
    color,
    isVisible,
    onClose,
    getCloseIconProps,
  } = useAlert({...props, ref});

  const mainWrapper = useMemo(() => {
    return (
      <div {...getMainWrapperProps()}>
        {title && <div {...getTitleProps()}>{title}</div>}
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [title, description, getMainWrapperProps, getTitleProps, getDescriptionProps]);

  const baseWrapper = useMemo(() => {
    return isVisible ? (
      <div ref={domRef} {...getBaseProps()}>
        <AlertIcon color={color} />
        {mainWrapper}
        {(isClosable || onClose) && (
          <button onClick={handleClose} {...getCloseButtonProps()}>
            <CloseIcon {...getCloseIconProps()} height={20} width={20} />
          </button>
        )}
      </div>
    ) : null;
  }, [
    mainWrapper,
    isClosable,
    getCloseButtonProps,
    isVisible,
    domRef,
    getBaseProps,
    handleClose,
    color,
    onClose,
  ]);

  return <>{baseWrapper}</>;
});

Alert.displayName = "NextUI.Alert";

export default Alert;
