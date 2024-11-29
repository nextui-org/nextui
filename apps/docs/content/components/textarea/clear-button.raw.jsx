import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      isClearable
      className="max-w-xs"
      defaultValue="junior@nextui.org"
      label="Email"
      placeholder="Enter your email"
      variant="bordered"
      // eslint-disable-next-line no-console
      onClear={() => console.log("textarea cleared")}
    />
  );
}
