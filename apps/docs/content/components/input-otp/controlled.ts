const App = `import {InputOtp} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <InputOtp
        value={value}
        onValueChange={setValue}
      />
      <p className="text-default-500 text-small">InputOtp value: {value}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
