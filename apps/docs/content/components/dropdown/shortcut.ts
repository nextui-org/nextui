const App = `import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
        <DropdownItem key="new" shortcut="⌘N">New file</DropdownItem>
        <DropdownItem key="copy" shortcut="⌘C">Copy link</DropdownItem>
        <DropdownItem key="edit" shortcut="⌘⇧E">Edit file</DropdownItem>
        <DropdownItem key="delete" showDivider shortcut="⌘⇧D" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
