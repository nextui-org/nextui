import React from "react";
import {Autocomplete, AutocompleteItem} from "@heroui/react";

export const animals = [
  {label: "Cat", key: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", key: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", key: "elephant", description: "The largest land animal"},
  {label: "Lion", key: "lion", description: "The king of the jungle"},
  {label: "Tiger", key: "tiger", description: "The largest cat species"},
  {label: "Giraffe", key: "giraffe", description: "The tallest land animal"},
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {label: "Penguin", key: "penguin", description: "A group of aquatic flightless birds"},
  {label: "Zebra", key: "zebra", description: "A several species of African equids"},
  {
    label: "Shark",
    key: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {label: "Otter", key: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
  {label: "Crocodile", key: "crocodile", description: "A large semiaquatic reptile"},
];

export default function App() {
  const [value, setValue] = React.useState<string>("");
  const [selectedKey, setSelectedKey] = React.useState<React.Key | null>(null);

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key);
  };

  const onInputChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex w-full flex-col">
      <Autocomplete
        allowsCustomValue={true}
        className="max-w-xs"
        defaultItems={animals}
        label="Search an animal"
        variant="underlined"
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      >
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>
      <p className="mt-1 text-small text-default-500">Current selected animal: {selectedKey}</p>
      <p className="text-small text-default-500">Current input text: {value}</p>
    </div>
  );
}
