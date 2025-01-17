import {Button, Form, NumberInput} from "@heroui/react";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = await callServer(data);

    setErrors(result.errors);
    setIsLoading(false);
  };

  return (
    <Form
      className="w-full max-w-xs"
      validationBehavior="native"
      validationErrors={errors}
      onSubmit={onSubmit}
    >
      <NumberInput
        isRequired
        isDisabled={isLoading}
        label="Width"
        name="width"
        placeholder="Enter a number"
      />
      <Button color="primary" isLoading={isLoading} type="submit">
        Submit
      </Button>
    </Form>
  );
}

// Fake server used in this example.
async function callServer(_) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    errors: {
      width: "Sorry, this width is not valid.",
    },
  };
}
