const App = `import { Chip } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip color="warning" variant="solid">Solid</Chip>
      <Chip color="warning" variant="bordered">Bordered</Chip>
      <Chip color="warning" variant="light">Light</Chip>
      <Chip color="warning" variant="flat">Flat</Chip>
      <Chip color="warning" variant="faded">Faded</Chip>
      <Chip color="warning" variant="shadow">Shadow</Chip>
      <Chip color="warning" variant="dot">Dot</Chip>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
