import {Form, Input, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Form validationBehavior="native">
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        name="email"
        type="email"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
