const App = `import { Dropdown } from "@nextui-org/react";

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Button flat color="secondary">
        Trigger
      </Dropdown.Button>
      <Dropdown.Menu color="secondary" aria-label="Actions">
        <Dropdown.Item key="new" command="⌘N">
          New file
        </Dropdown.Item>
        <Dropdown.Item key="copy" command="⌘C">
          Copy link
        </Dropdown.Item>
        <Dropdown.Item key="edit" command="⌘⇧E">
          Edit file
        </Dropdown.Item>
        <Dropdown.Item withDivider key="delete" color="error" command="⌘⇧D">
          Delete file
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
