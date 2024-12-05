import {Form, Input, Select, SelectItem, Checkbox, Button} from "@nextui-org/react";

export default function App() {
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Validate password match
    if (data.password !== data.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });

      return;
    }

    // Clear any previous errors
    setErrors({});
    setSubmitted(data);
  };

  return (
    <Form
      className="w-full justify-center items-center w-full space-y-4"
      validationBehavior="native"
      validationErrors={errors}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
        />

        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

        <Input
          isRequired
          label="Confirm Password"
          labelPlacement="outside"
          name="confirmPassword"
          placeholder="Confirm your password"
          type="password"
        />

        <Select
          isRequired
          label="Country"
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
        >
          <SelectItem key="ar" value="ar">
            Argentina
          </SelectItem>
          <SelectItem key="us" value="us">
            United States
          </SelectItem>
          <SelectItem key="ca" value="ca">
            Canada
          </SelectItem>
          <SelectItem key="uk" value="uk">
            United Kingdom
          </SelectItem>
          <SelectItem key="au" value="au">
            Australia
          </SelectItem>
        </Select>

        <Checkbox isRequired name="terms" value={true}>
          I agree to the terms and conditions
        </Checkbox>

        <Button className="w-full" color="primary" type="submit">
          Submit
        </Button>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
