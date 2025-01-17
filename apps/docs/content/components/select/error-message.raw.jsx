import {Select, SelectItem} from "@heroui/react";

export const animals = [
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
  {key: "crocodile", label: "Crocodile"},
];

export default function App() {
  const [value, setValue] = React.useState(new Set([]));
  const [touched, setTouched] = React.useState(false);

  const isValid = value.has("cat");

  return (
    <Select
      className="max-w-xs"
      description="The second most popular pet in the world"
      errorMessage={isValid || !touched ? "" : "You must select a cat"}
      isInvalid={isValid || !touched ? false : true}
      label="Favorite Animal"
      placeholder="Select an animal"
      selectedKeys={value}
      variant="bordered"
      onClose={() => setTouched(true)}
      onSelectionChange={setValue}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
}
