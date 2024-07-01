import {useState} from "react";
import {Button, Tooltip} from "@nextui-org/react";
import {CopyIcon, MoonIcon, SunIcon} from "@nextui-org/shared-icons";

import {ThemeType} from "../../types";

import {TickBoldIcon} from "@/components/icons/tick-bold";

interface ActionsProps {
  theme: ThemeType;
  onCopy: () => unknown;
  onResetTheme: () => void;
  onToggleTheme: () => void;
}

export function Actions({theme, onCopy, onResetTheme, onToggleTheme}: ActionsProps) {
  const [copied, setCopied] = useState(false);
  const isLight = theme === "light";

  /**
   * Handle the copying of the configuration.
   */
  function handleCopyConfig() {
    navigator.clipboard.writeText(JSON.stringify(onCopy(), null, 2));

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex gap-2">
      <Tooltip content={isLight ? "Dark" : "Light"}>
        <Button isIconOnly color="secondary" size="sm" variant="flat" onClick={onToggleTheme}>
          {isLight ? <MoonIcon className="text-xl" /> : <SunIcon className="text-xl" />}
        </Button>
      </Tooltip>
      <Tooltip content="Reset theme">
        <Button isIconOnly color="secondary" size="sm" variant="flat" onClick={onResetTheme}>
          <MoonIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Copy configuration">
        <Button isIconOnly color="secondary" size="sm" variant="flat" onClick={handleCopyConfig}>
          {copied ? <TickBoldIcon /> : <CopyIcon className="text-xl" />}
        </Button>
      </Tooltip>
    </div>
  );
}
