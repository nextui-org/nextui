import type {ButtonProps} from "@nextui-org/button";

import {forwardRef} from "@nextui-org/system";
import {
  CloseIcon,
  DangerIcon,
  InfoCircleIcon,
  SuccessIcon,
  WarningIcon,
} from "@nextui-org/shared-icons";
import {isEmpty} from "@nextui-org/shared-utils";
import {Button} from "@nextui-org/button";
import {cloneElement, isValidElement} from "react";

import {useAlert, UseAlertProps} from "./use-alert";

const iconMap = {
  primary: InfoCircleIcon,
  secondary: InfoCircleIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

export type AlertColor = keyof typeof iconMap;

export interface AlertProps extends Omit<UseAlertProps, "hasDescription"> {
  color: AlertColor;
}

const Alert = forwardRef<"div", AlertProps>((props, ref) => {
  const {
    title,
    icon,
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

  if (!isVisible) return null;

  const customIcon = icon && isValidElement(icon) ? cloneElement(icon, getAlertIconProps()) : null;

  const IconComponent = iconMap[color] || iconMap.primary;

  return (
    <div ref={domRef} role="alert" {...getBaseProps()}>
      {customIcon || <IconComponent {...getAlertIconProps()} />}
      <div {...getMainWrapperProps()}>
        {title && <div {...getTitleProps()}>{title}</div>}
        {!isEmpty(description) && <div {...getDescriptionProps()}>{description}</div>}
      </div>

      {(isClosable || onClose) && (
        <Button
          isIconOnly
          aria-label="Close"
          radius="full"
          variant="light"
          onClick={handleClose}
          {...(getCloseButtonProps() as ButtonProps)}
        >
          <CloseIcon height={20} width={20} />
        </Button>
      )}
    </div>
  );
});

Alert.displayName = "NextUI.Alert";

export default Alert;
