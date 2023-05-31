const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  const variants = ["flat", "faded", "bordered", "underlined"];

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {variants.map((variant) => (
        <Textarea
          key={variant}
          variant={variant}
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        />
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
