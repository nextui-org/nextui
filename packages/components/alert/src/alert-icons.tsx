import {DangerIcon, InfoCircleIcon, SuccessIcon, WarningIcon} from "@nextui-org/shared-icons";

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
