import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";

import {useAlert, UseAlertProps} from "./use-alert";
import {AlertCloseIcon, AlertIcon} from "./alert-icons";

export interface alertProps extends UseAlertProps {}

const Alert = forwardRef<"div", alertProps>((props, ref) => {
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
            <AlertCloseIcon color={color} />
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
