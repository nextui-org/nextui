const App = `import { Link, Button } from "@nextui-org/react";

export default function App() {
  return (
    <Button
      href="https://github.com/nextui-org/nextui"
      as={Link}
      color="primary"
      showAnchorIcon
      variant="solid"
    >
      Button Link
    </Button>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
