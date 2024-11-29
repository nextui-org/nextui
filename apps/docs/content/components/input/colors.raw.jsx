import {Input} from "@nextui-org/react";

export default function App() {
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {colors.map((color) => (
        <Input
          key={color}
          className="max-w-[220px]"
          color={color}
          defaultValue="junior@nextui.org"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
      ))}
    </div>
  );
}
