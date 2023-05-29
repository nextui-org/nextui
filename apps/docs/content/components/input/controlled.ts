const App = `import {Input} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Input
        label="Email"
        placeholder="Enter your email"
        value={value}
        onValueChange={setValue}
      />
      <p className="text-default-500 text-sm">Input value: {value}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
