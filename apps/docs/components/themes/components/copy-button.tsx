import {useState} from "react";
import {Icon} from "@iconify/react/dist/offline";
import SunIcon from "@iconify/icons-solar/sun-linear";
import MoonIcon from "@iconify/icons-solar/moon-linear";
import CopyIcon from "@iconify/icons-solar/copy-linear";
import CheckCircleIcon from "@iconify/icons-solar/check-circle-linear";
import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import {ThemeType} from "../types";

interface CopyButtonProps extends Omit<ButtonProps, "onCopy"> {
  onCopy: (theme: ThemeType) => void;
}

export function CopyButton({onCopy, ...rest}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy(theme: ThemeType) {
    onCopy(theme);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly {...rest}>
          {copied ? (
            <Icon className="text-lg" icon={CheckCircleIcon} />
          ) : (
            <Icon className="text-lg" icon={CopyIcon} />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Copy configuration">
        <DropdownItem
          key="light"
          startContent={<Icon className="text-lg" icon={SunIcon} />}
          onPress={() => handleCopy("light")}
        >
          Light config
        </DropdownItem>
        <DropdownItem
          key="dark"
          startContent={<Icon className="text-lg" icon={MoonIcon} />}
          onPress={() => handleCopy("dark")}
        >
          Dark config
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
