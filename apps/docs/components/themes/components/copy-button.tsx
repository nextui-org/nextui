import {useState} from "react";
import {Button, Tooltip} from "@nextui-org/react";
import {CopyIcon, MoonIcon} from "@nextui-org/shared-icons";

interface CopyButtonProps {
  getData: () => unknown;
}

export function CopyButton({getData}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleCopyConfig() {
    navigator.clipboard.writeText(JSON.stringify(getData(), null, 2));

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Tooltip content="Copy configuration">
      <Button isIconOnly color="secondary" size="sm" variant="flat" onClick={handleCopyConfig}>
        {copied ? <MoonIcon /> : <CopyIcon />}
      </Button>
    </Tooltip>
  );
}
