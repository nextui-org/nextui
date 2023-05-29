const App = `import {Input} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("junior2nextui.org");

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = React.useMemo(() => {
    if (value === "") return undefined;

    return validateEmail(value) ? "valid" : "invalid";
  }, [value]);

  return (
    <Input
      value={value}
      type="email"
      label="Email"
      variant="bordered"
      color={validationState === "invalid" ? "danger" : "success"}
      errorMessage={validationState === "invalid" && "Please enter a valid email"}
      validationState={validationState}
      onValueChange={setValue}
      className="max-w-xs"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
