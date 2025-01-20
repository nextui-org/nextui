import {ButtonProps} from "@heroui/react";
import {useClipboard} from "@heroui/use-clipboard";
import {memo} from "react";

import {PreviewButton} from "./preview-button";

import {CheckLinearIcon, CopyLinearIcon} from "@/components/icons";

export interface CopyButtonProps extends ButtonProps {
  value?: string;
}

export const CopyButton = memo<CopyButtonProps>(({value, className, ...buttonProps}) => {
  const {copy, copied} = useClipboard();

  const icon = copied ? (
    <CheckLinearIcon
      className="opacity-0 scale-50 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
      data-visible={copied}
      size={16}
    />
  ) : (
    <CopyLinearIcon
      className="opacity-0 scale-50 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
      data-visible={!copied}
      size={16}
    />
  );

  const handleCopy = () => {
    copy(value);
  };

  return <PreviewButton className={className} icon={icon} onPress={handleCopy} {...buttonProps} />;
});

CopyButton.displayName = "CopyButton";
