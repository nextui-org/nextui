import {Input} from "@heroui/react";

export default function App() {
  const [value, setValue] = React.useState("junior2heroui.com");

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <Input
      className="max-w-xs"
      color={isInvalid ? "danger" : "success"}
      errorMessage="Please enter a valid email"
      isInvalid={isInvalid}
      label="Email"
      type="email"
      value={value}
      variant="bordered"
      onValueChange={setValue}
    />
  );
}
