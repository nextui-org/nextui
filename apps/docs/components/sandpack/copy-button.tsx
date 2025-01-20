import React from "react";
import {useSandpack} from "@codesandbox/sandpack-react";
import {Tooltip, Button} from "@heroui/react";
import {useClipboard} from "@heroui/use-clipboard";

import {CopyLinearIcon} from "@/components/icons";

export const CopyButton = ({code: codeProp}: {code?: string}) => {
  const {copy, copied} = useClipboard();

  const {sandpack} = useSandpack();

  const copyHandler = () => {
    const code = codeProp ?? sandpack.files[sandpack.activeFile].code;

    copy(code);
  };

  return (
    <Tooltip
      className="text-xs px-2"
      closeDelay={0}
      content={copied ? "Copied!" : "Copy"}
      radius="md"
    >
      <Button isIconOnly size="sm" title="Copy Code" variant="light" onPress={copyHandler}>
        <CopyLinearIcon className="text-white dark:text-zinc-500" height={16} width={16} />
      </Button>
    </Tooltip>
  );
};
