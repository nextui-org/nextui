const data = `export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"}
];`;

const App = `import {Select, SelectItem, Button} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex w-full max-w-xs items-center gap-2">
      <Select
        isOpen={isOpen}
        label="Favorite Animal"
        placeholder="Select an animal"
        defaultSelectedKeys={["cat"]}
        onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Button aria-label="Open" aria-pressed={isOpen} onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </Button>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/data.js": data,
};

export default {
  ...react,
};
