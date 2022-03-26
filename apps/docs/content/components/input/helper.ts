const App = `import { Input, useInput, validateEmail, Grid } from "@nextui-org/react";
import React from "react";

export default function App() {
  const { value, reset, bindings } = useInput("");
  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input
          {...bindings}
          clearable
          shadow={false}
          onClearClick={reset}
          status={helper.color}
          color={helper.color}
          helperColor={helper.color}
          helperText={helper.text}
          type="email"
          label="Email"
          placeholder="With regex validation"
        />
      </Grid>
      <Grid>
        <Input
          clearable
          helperText="Please enter your name"
          label="Name"
          placeholder="Enter your name"
        />
      </Grid>
      <Grid>
        <Input
          clearable
          color="error"
          helperText="Required"
          label="Error"
          placeholder="Enter something"
        />
      </Grid>
      <Grid>
        <Input
          clearable
          color="success"
          initialValue="getnextui"
          helperText="Excelent username"
          type="test"
          label="Username"
          placeholder="Enter your username"
        />
      </Grid>
      <Grid>
        <Input
          clearable
          color="warning"
          helperText="Insecure password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
      </Grid>
      <Grid>
        <Input.Password
          clearable
          color="warning"
          initialValue="123"
          helperText="Insecure password"
          type="password"
          label="Password"
          placeholder="Enter your password with eye"
        />
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};

