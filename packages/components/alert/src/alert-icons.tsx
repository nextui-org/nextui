import {
  CloseIcon,
  DangerIcon,
  InfoCircleIcon,
  SuccessIcon,
  WarningIcon,
} from "@nextui-org/shared-icons";

export const AlertCloseIcon = (props: {color: string}) => {
  switch (props.color) {
    case "primary":
      return <CloseIcon className="fill-current text-primary-200" height={20} width={20} />;

    case "secondary":
      return <CloseIcon className="fill-current text-secondary-200" height={20} width={20} />;

    case "success":
      return <CloseIcon className="fill-current text-success-200" height={20} width={20} />;

    case "warning":
      return <CloseIcon className="fill-current text-warning-200" height={20} width={20} />;

    case "danger":
      return <CloseIcon className="fill-current text-danger-200" height={20} width={20} />;

    default:
      return <CloseIcon className="fill-current text-default-400" height={20} width={20} />;
  }
};

export const AlertIcon = (props: {color: string}) => {
  switch (props.color) {
    case "primary":
      return <InfoCircleIcon className="fill-current text-primary" />;
    case "secondary":
      return <InfoCircleIcon className="fill-current text-secondary" />;
    case "success":
      return <SuccessIcon className="fill-current text-success" />;
    case "warning":
      return <WarningIcon className="fill-current text-warning" />;
    case "danger":
      return <DangerIcon className="fill-current text-danger" />;
    default:
      return <InfoCircleIcon className="fill-current text-default-foreground" />;
  }
};
