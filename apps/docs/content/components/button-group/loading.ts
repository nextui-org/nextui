const App = `import { Button, Loading } from "@nextui-org/react";

export default function App() {
  return (
    <Button.Group>
      <Button clickable={false}>
        <Loading color="white" size="sm" />
      </Button>
      <Button clickable={false}>
        <Loading type="spinner" color="white" size="sm" />
      </Button>
      <Button clickable={false}>
        <Loading type="points" color="white" size="sm" />
      </Button>
    </Button.Group>
  );
}

`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
