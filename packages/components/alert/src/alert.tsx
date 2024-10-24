import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {
  CloseIcon,
  DangerIcon,
  InfoCircleIcon,
  SuccessIcon,
  WarningIcon,
} from "@nextui-org/shared-icons";

import {useAlert, UseAlertProps} from "./use-alert";

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
    getAlertIconProps,
  } = useAlert({...props, ref});

  const mainWrapper = useMemo(() => {
    return (
      <div {...getMainWrapperProps()}>
        {title && <div {...getTitleProps()}>{title}</div>}
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [title, description, getMainWrapperProps, getTitleProps, getDescriptionProps]);

  const iconMap = {
    primary: InfoCircleIcon,
    secondary: InfoCircleIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    danger: DangerIcon,
  };

  const IconComponent = iconMap[color] || InfoCircleIcon;

  const alertIcon = useMemo(() => {
    return <IconComponent {...getAlertIconProps()} />;
  }, [color, getAlertIconProps]);

  const baseWrapper = useMemo(() => {
    return isVisible ? (
      <div ref={domRef} {...getBaseProps()}>
        {alertIcon}
        {mainWrapper}
        {(isClosable || onClose) && (
          <button onClick={handleClose} {...getCloseButtonProps()}>
            <CloseIcon height={20} width={20} />
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
    onClose,
    alertIcon,
  ]);

  return <>{baseWrapper}</>;
});

Alert.displayName = "NextUI.Alert";

export default Alert;
