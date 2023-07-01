const App = `import {Badge, Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-3 items-center">
      <Badge content="5" size="sm" color="primary">
        <Avatar
          radius="md"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </Badge>
      <Badge content="5" size="md" color="primary">
        <Avatar
          radius="md"
          src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
        />
      </Badge>
      <Badge content="5" size="lg" color="primary">
        <Avatar
          radius="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </Badge>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
