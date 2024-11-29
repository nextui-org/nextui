import {Textarea} from "@nextui-org/react";

export default function App() {
  const variants = ["flat", "faded", "bordered", "underlined"];

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {variants.map((variant) => (
        <Textarea
          key={variant}
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          variant={variant}
        />
      ))}
    </div>
  );
}
