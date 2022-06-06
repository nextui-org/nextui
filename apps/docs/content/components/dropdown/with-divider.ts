const App = `import { Dropdown } from "@nextui-org/react";

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Button flat>Trigger</Dropdown.Button>
      <Dropdown.Menu aria-label="Static Actions">
        <Dropdown.Item key="new">New file</Dropdown.Item>
        <Dropdown.Item key="copy">Copy link</Dropdown.Item>
        <Dropdown.Item key="edit">Edit file</Dropdown.Item>
        <Dropdown.Item key="delete" withDivider color="error">
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
