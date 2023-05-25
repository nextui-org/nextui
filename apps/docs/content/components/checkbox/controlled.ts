const App = `import { Checkbox } from "@nextui-org/react";

export default function App() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
        Subscribe (controlled)
      </Checkbox>
      <p className="text-neutral-500">
        Selected: {isSelected ? "true" : "false"}
      </p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
