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

const App = `import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./data";


export default function App() {
  const [value, setValue] = React.useState('');
  const [selectedKey, setSelectedKey] = React.useState(null);

  const onSelectionChange = (id) => {
    setSelectedKey(id);
  };
  
  const onInputChange = (value) => {
    setValue(value)
  };

  return (
    <div className="flex w-full flex-col">
      <Autocomplete 
        label="Search an animal" 
        variant="bordered"
        defaultItems={animals}
        className="max-w-xs" 
        allowsCustomValue={true}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <p className="mt-1 text-small text-default-500">Current selected animal: {selectedKey}</p>
      <p className="text-small text-default-500">Current input text: {value}</p>
    </div>
  );
}`;

const AppTs = `import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  const [value, setValue] = React.useState<string>('');
  const [selectedKey, setSelectedKey] = React.useState<React.Key | null>(null);

  const onSelectionChange = (key: React.Key) => {
    setSelectedKey(key);
  };
  
  const onInputChange = (value: string) => {
    setValue(value)
  };

  return (
    <div className="flex w-full flex-col">
      <Autocomplete 
        label="Search an animal" 
        variant="underlined"
        defaultItems={animals}
        className="max-w-xs" 
        allowsCustomValue={true}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <p className="mt-1 text-small text-default-500">Current selected animal: {selectedKey}</p>
      <p className="text-small text-default-500">Current input text: {value}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/data.js": data,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
