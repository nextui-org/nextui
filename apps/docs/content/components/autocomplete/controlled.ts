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

const AppTs = `import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState<React.Key>("cat");

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Autocomplete
        label="Favorite Animal"
        variant="bordered"
        defaultItems={animals}
        placeholder="Search an animal"
        className="max-w-xs"
        selectedKey={value}
        onSelectionChange={setValue}
      >
      {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <p className="text-default-500 text-small">Selected: {value}</p>
    </div>
  );
}`;

const App = `import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState("cat");

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Autocomplete
        label="Favorite Animal"
        variant="bordered"
        defaultItems={animals}
        placeholder="Search an animal"
        className="max-w-xs"
        selectedKey={value}
        onSelectionChange={setValue}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <p className="text-default-500 text-small">Selected: {value}</p>
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
