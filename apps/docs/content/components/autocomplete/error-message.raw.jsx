import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

export const animals = [
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
];

export default function App() {
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const isValid = value === "cat";

  return (
    <Autocomplete
      className="max-w-xs"
      defaultItems={animals}
      description="The second most popular pet in the world"
      errorMessage={isValid || !touched ? "" : "You must select a cat"}
      isInvalid={isValid || !touched ? false : true}
      label="Favorite Animal"
      placeholder="Search an animal"
      selectedKey={value}
      variant="bordered"
      onClose={() => setTouched(true)}
      onSelectionChange={setValue}
    >
      {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  );
}
