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
  const radius = [
    "full",
    "lg",
    "md",
    "sm",
    "none",
  ];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {radius.map((r) => (
        <Select
          key={r}
          radius={r}
          label="Favorite Animal"
          placeholder="Select an animal"
          defaultSelectedKeys={["cat"]}
          className="max-w-[45%]"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      ))}  
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
