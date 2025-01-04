import {Button, Form, NumberField} from "@nextui-org/react";

export default function App() {
  const [submitted, setSubmitted] = React.useState(null);
  const [width, setWidth] = React.useState(null);
  const errors = [];

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  if (width < 100) {
    errors.push("The value must be greater than 100");
  }

  if (width > 1000) {
    errors.push("The value must be less than 1000");
  }

  return (
    <Form className="w-full max-w-xs" validationBehavior="native" onSubmit={onSubmit}>
      <NumberField
        errorMessage={() => (
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
        isInvalid={errors.length > 0}
        label="Width"
        name="width"
        placeholder="Enter a number"
        value={width}
        onValueChange={setWidth}
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}
