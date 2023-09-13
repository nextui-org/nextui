import React from "react";
import {UnstyledOpenInCodeSandboxButton} from "@codesandbox/sandpack-react";
import {Tooltip, Button} from "@nextui-org/react";
import {useSandpack} from "@codesandbox/sandpack-react";

import {CodeSandboxIcon} from "@/components/icons";
import {trackEvent} from "@/utils/va";

export const CodeSandboxButton = () => {
  const {sandpack} = useSandpack();

  return (
    <Tooltip
      className="text-xs px-2"
      closeDelay={0}
      content="Open in CodeSandbox"
      placement="top"
      radius="md"
    >
      <Button
        isIconOnly
        as="span"
        size="sm"
        title="Open in CodeSandbox"
        variant="light"
        onPress={() => {
          trackEvent("CodeSandboxButton - Sandpack", {
            action: "press",
            category: "docs",
            data: sandpack.files[sandpack.activeFile],
          });
        }}
      >
        <UnstyledOpenInCodeSandboxButton
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // reset button styles
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <CodeSandboxIcon className="text-white dark:text-zinc-500" height={20} width={20} />
        </UnstyledOpenInCodeSandboxButton>
      </Button>
    </Tooltip>
  );
};
