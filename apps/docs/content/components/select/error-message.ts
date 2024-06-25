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

const App = `import {Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState(new Set([]));
  const [touched, setTouched] = React.useState(false);

  const isValid = value.has("cat");

  return (
    <Select
      label="Favorite Animal"
      variant="bordered"
      placeholder="Select an animal"
      description="The second most popular pet in the world"
      errorMessage={isValid || !touched ? "" : "You must select a cat"}
      isInvalid={isValid || !touched ? false : true}
      selectedKeys={value}
      className="max-w-xs"
      onSelectionChange={setValue}
      onClose={() => setTouched(true)}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
}`;

const react = {
  "/App.jsx": App,
  "/data.js": data,
};

export default {
  ...react,
};
