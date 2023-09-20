const App = `import {Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-3 items-center">
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isDisabled name="Junior" />
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isDisabled name="Jane" />
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isDisabled name="Joe" />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
