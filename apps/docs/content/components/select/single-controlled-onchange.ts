const data = `export const animals = [
  {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", value: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", value: "elephant", description: "The largest land animal"},
  {label: "Lion", value: "lion", description: "The king of the jungle"},
  {label: "Tiger", value: "tiger", description: "The largest cat species"},
  {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
  {label: "Zebra", value: "zebra", description: "A several species of African equids"},
  {
    label: "Shark",
    value: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
  {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
];`;

const App = `import {Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState("");

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Favorite Animal"
        variant="bordered"
        placeholder="Select an animal"
        selectedKeys={[value]}
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {value}</p>
    </div>
  );
}`;

const AppTs = `import {Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState<string>("");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Favorite Animal"
        variant="bordered"
        placeholder="Select an animal"
        selectedKeys={[value]}
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
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
