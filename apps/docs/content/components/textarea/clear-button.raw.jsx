import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      isClearable
      className="max-w-xs"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      label="Description"
      placeholder="Description"
      variant="bordered"
      // eslint-disable-next-line no-console
      onClear={() => console.log("textarea cleared")}
    />
  );
}
