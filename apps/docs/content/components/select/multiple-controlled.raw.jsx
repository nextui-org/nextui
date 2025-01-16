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
  const [values, setValues] = React.useState(new Set(["cat", "dog"]));

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        className="max-w-xs"
        label="Favorite Animal"
        placeholder="Select an animal"
        selectedKeys={values}
        selectionMode="multiple"
        onSelectionChange={setValues}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>
    </div>
  );
}
