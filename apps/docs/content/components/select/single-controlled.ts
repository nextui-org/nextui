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

const AppTs = `import {Select, SelectItem, Selection} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState<Selection>(new Set([]));

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Favorite Animal"
        variant="bordered"
        placeholder="Select an animal"
        selectedKeys={value}
        className="max-w-xs"
        onSelectionChange={setValue}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-default-500 text-small">Selected: {value}</p>
    </div>
  );
}`;

const App = `import {Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState(new Set([]));

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Favorite Animal"
        variant="bordered"
        placeholder="Select an animal"
        selectedKeys={value}
        className="max-w-xs"
        onSelectionChange={setValue}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {value}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/data.js": data,
};

const reactTs = {
  "/App.tsx": AppTs,
  "/data.js": data,
};

export default {
  ...react,
  ...reactTs,
};
