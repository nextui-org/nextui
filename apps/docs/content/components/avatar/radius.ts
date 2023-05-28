const App = `import {Avatar} from "@nextui-org/react

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      <Avatar isBordered radius="2xl" src="https://i.pravatar.cc/150?u=a0423b7422f0e6002d" />
      <Avatar isBordered radius="xl" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar isBordered radius="none" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
