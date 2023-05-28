const App = `import {Badge, Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-3 items-center">
      <Badge content="5" radius="full" color="secondary">
        <Avatar
          radius="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </Badge>
      <Badge content="5" radius="xl" color="secondary">
        <Avatar
          radius="lg"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </Badge>
      <Badge content="5" radius="lg" color="secondary">
        <Avatar
          radius="lg"
          src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
        />
      </Badge>
      <Badge content="5" radius="md" color="secondary">
        <Avatar
          radius="lg"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </Badge>
      <Badge content="5" radius="sm" color="secondary">
        <Avatar
          radius="lg"
          src="https://i.pravatar.cc/150?u=a04258114a29026708c"
        />
      </Badge>
      <Badge content="5" radius="base" color="secondary">
        <Avatar
          radius="lg"
          src="https://i.pravatar.cc/150?u=bfe358194b29026708c"
        />
      </Badge>
      <Badge content="5" radius="none" color="secondary">
        <Avatar
          radius="lg"
          src="https://i.pravatar.cc/150?u=a04258114c29026708c"
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
