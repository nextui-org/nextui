import {Input} from "@nextui-org/react";

export default function App() {
  const [password, setPassword] = React.useState("");
  const errors = [];

  if (password.length < 4) {
    errors.push("Password must be 4 characters or more.");
  }
  if ((password.match(/[A-Z]/g) || []).length < 1) {
    errors.push("Password must include at least 1 upper case letter");
  }
  if ((password.match(/[^a-z]/gi) || []).length < 1) {
    errors.push("Password must include at least 1 symbol.");
  }

  return (
    <Input
      className="max-w-xs"
      errorMessage={() => (
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
      isInvalid={errors.length > 0}
      label="Password"
      labelPlacement="outside"
      placeholder="Enter your password"
      value={password}
      variant="bordered"
      onValueChange={setPassword}
    />
  );
}
