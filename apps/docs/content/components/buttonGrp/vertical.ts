const App = `import { Button } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Button.Group size="xs" vertical>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </Button.Group>
      <Button.Group size="sm" vertical flat>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </Button.Group>
      <Button.Group size="md" vertical bordered>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </Button.Group>
      <Button.Group size="lg" vertical flat>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </Button.Group>
      <Button.Group size="xl" vertical color="gradient" bordered>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <Button>Four</Button>
      </Button.Group>
    </>
  );
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
