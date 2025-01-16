import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with shortcut" variant="flat">
        <DropdownItem key="new" shortcut="⌘N">
          New file
        </DropdownItem>
        <DropdownItem key="copy" shortcut="⌘C">
          Copy link
        </DropdownItem>
        <DropdownItem key="edit" shortcut="⌘⇧E">
          Edit file
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" shortcut="⌘⇧D">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
