import {Textarea} from "@heroui/react";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Textarea
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        value={value}
        variant="underlined"
        onValueChange={setValue}
      />
      <p className="text-default-500 text-small">Textarea value: {value}</p>
    </div>
  );
}
