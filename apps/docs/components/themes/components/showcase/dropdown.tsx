import {
  Dropdown as NextUIDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import {NextUIColor, NextUIVariant} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Dropdown() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Dropdown" variants={variants}>
      {colors.map((color) => (
        <DropdownContent key={color} color={color} />
      ))}
    </ShowcaseComponent>
  );
}

interface DropdownContentProps {
  color: NextUIColor;
  variant?: Extract<NextUIVariant, "solid" | "faded" | "bordered" | "light" | "flat" | "shadow">;
}

function DropdownContent({color, variant}: DropdownContentProps) {
  return (
    <NextUIDropdown>
      <DropdownTrigger>
        <Button className="capitalize" color={color} variant={variant}>
          {color}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Variants" color={color} variant={variant}>
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </NextUIDropdown>
  );
}

const colors: NextUIColor[] = ["default", "primary", "secondary", "success", "warning", "danger"];
const variants: NextUIVariant[] = ["solid", "faded", "bordered", "light", "flat", "shadow"];
