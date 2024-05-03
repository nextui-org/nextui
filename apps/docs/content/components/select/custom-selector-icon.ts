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

const SelectorIcon = `export const SelectorIcon = (props) => (
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
);`;

const App = `import {Select, SelectItem} from "@nextui-org/react";
import {SelectorIcon} from "./SelectorIcon";
import {animals} from "./data";

export default function App() {
  return (
    <Select
      label="Favorite Animal"
      placeholder="Select an animal"
      labelPlacement="outside"
      className="max-w-xs"
      disableSelectorIconRotation
      selectorIcon={<SelectorIcon />}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
}`;

const react = {
  "/App.jsx": App,
  "/data.js": data,
  "/SelectorIcon.jsx": SelectorIcon,
};

export default {
  ...react,
};
