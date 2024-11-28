import {Button, InputOtp} from "@nextui-org/react";

export default function App() {
  return (
    <form
      className="flex w-full flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert(e.target.value);
      }}
    >
      <InputOtp isRequired aria-label="OTP input field" length={4} placeholder="Enter code" />
      <Button size="sm" type="submit" variant="bordered">
        Submit
      </Button>
    </form>
  );
}
