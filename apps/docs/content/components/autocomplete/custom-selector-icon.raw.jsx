import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

const SelectorIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </svg>
  );
};

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
  return (
    <Autocomplete
      disableSelectorIconRotation
      className="max-w-xs"
      defaultItems={animals}
      label="Favorite Animal"
      labelPlacement="outside"
      placeholder="Search an animal"
      selectorIcon={<SelectorIcon />}
    >
      {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  );
}
