const App = `import { Avatar } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="xs" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" size="xl" />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-lg" />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
