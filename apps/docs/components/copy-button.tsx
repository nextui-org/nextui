import {FC} from "react";
import {Button, ButtonProps} from "@nextui-org/react";
import {useClipboard} from "@nextui-org/use-clipboard";
import {clsx} from "@nextui-org/shared-utils";

import {CheckLinearIcon, CopyLinearIcon} from "@/components/icons";

export interface CopyButtonProps extends ButtonProps {
  value?: string;
}

export const CopyButton: FC<CopyButtonProps> = ({value, className, ...buttonProps}) => {
  const {copy, copied} = useClipboard();

  const handleCopy = () => {
    copy(value);
  };

  return (
    <Button
      isIconOnly
      className={clsx(
        "absolute z-50 right-3 text-zinc-300 top-8 border-1 border-transparent bg-transparent before:bg-white/10 before:content-[''] before:block before:z-[-1] before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-100 before:rounded-lg",
        className,
      )}
      size="sm"
      variant="bordered"
      onPress={handleCopy}
      {...buttonProps}
    >
      <CheckLinearIcon
        className="absolute opacity-0 scale-50 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
        data-visible={copied}
        size={16}
      />
      <CopyLinearIcon
        className="absolute opacity-0 scale-50 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
        data-visible={!copied}
        size={16}
      />
    </Button>
  );
};
