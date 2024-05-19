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
  const placements = [
    "inside",
    "outside",
    "outside-left",
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">Without placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <Select
              labelPlacement={placement}
              label="Favorite Animal"
              className="max-w-xs"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
          ))}
        </div>
      </div>  
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">With placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <Select
              labelPlacement={placement}
              label="Favorite Animal"
              placeholder="Select an animal"
              className="max-w-xs"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
          ))}
        </div>
      </div>  
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
