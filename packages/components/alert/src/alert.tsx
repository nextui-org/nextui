import type {ButtonProps} from "@heroui/button";

import {forwardRef} from "@heroui/system";
import {
  CloseIcon,
  DangerIcon,
  InfoCircleIcon,
  SuccessIcon,
  WarningIcon,
} from "@heroui/shared-icons";
import {isEmpty} from "@heroui/shared-utils";
import {Button} from "@heroui/button";
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

export interface AlertProps extends Omit<UseAlertProps, "hasContent"> {}

const Alert = forwardRef<"div", AlertProps>((props, ref) => {
  const {
    title,
    icon,
    children,
    description,
    endContent,
    startContent,
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
    getIconWrapperProps,
  } = useAlert({...props, ref});

  if (!isVisible) return null;

  const customIcon = icon && isValidElement(icon) ? cloneElement(icon, getAlertIconProps()) : null;

  const IconComponent = iconMap[color] || iconMap.primary;

  return (
    <div ref={domRef} role="alert" {...getBaseProps()}>
      {startContent}
      <div {...getIconWrapperProps()}>
        {customIcon || <IconComponent {...getAlertIconProps()} />}
      </div>
      <div {...getMainWrapperProps()}>
        {!isEmpty(title) && <div {...getTitleProps()}>{title}</div>}
        {!isEmpty(description) && <div {...getDescriptionProps()}>{description}</div>}
        {children}
      </div>
      {endContent}
      {(isClosable || onClose) && (
        <Button
          isIconOnly
          aria-label="Close"
          radius="full"
          variant="light"
          onPress={handleClose}
          {...(getCloseButtonProps() as ButtonProps)}
        >
          <CloseIcon height={20} width={20} />
        </Button>
      )}
    </div>
  );
});

Alert.displayName = "HeroUI.Alert";

export default Alert;
