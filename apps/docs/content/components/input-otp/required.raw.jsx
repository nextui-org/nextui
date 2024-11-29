import {Button, InputOtp} from "@nextui-org/react";

export default function App() {
  return (
    <form
      className="flex w-full flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const otp = formData.get("otp");

        alert(`OTP submitted: ${otp}`);
      }}
    >
      <InputOtp
        isRequired
        aria-label="OTP input field"
        length={4}
        name="otp"
        placeholder="Enter code"
        validationBehavior="native"
      />
      <Button size="sm" type="submit" variant="bordered">
        Submit
      </Button>
    </form>
  );
}
