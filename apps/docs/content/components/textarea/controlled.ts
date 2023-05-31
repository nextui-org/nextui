const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Textarea
        variant="underlined"
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        value={value}
        onValueChange={setValue}
      />
      <p className="text-default-500 text-sm">Textarea value: {value}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
