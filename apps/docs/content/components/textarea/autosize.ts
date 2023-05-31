const App = `import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Textarea
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description (Default autosize)"
      />
      <Textarea
        minRows={2}
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description (Min rows 2)"
      />
      <Textarea
        maxRows={3}
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description (Max rows 3)"
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
