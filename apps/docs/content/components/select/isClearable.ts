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
  return (
      <div className="flex flex-col w-screen justify-center items-center">
      <h2>IsClearable = true</h2>
      <Select
          className="max-w-xs my-5"
          isClearable={true}
          label="Favorite Animal"
      >
      {animals.map((animal) => (
      <SelectItem key={animal.key}>
          {animal.label}
      </SelectItem>
      ))}
      </Select>
      <h2>IsClearable = true</h2>
      <Select
          className="max-w-xs my-5"
          isClearable={true}
          label="Favorite Animal"
      >
      {animals.map((animal) => (
      <SelectItem key={animal.key}>
          {animal.label}
      </SelectItem>
      ))}
      </Select>
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
