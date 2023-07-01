const App = `import {Badge, Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <Badge content="5" color="primary">
      <Avatar
        radius="md"
        size="lg"
        src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
      />
    </Badge>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
