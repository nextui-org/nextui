import {InputOtp} from "@nextui-org/react";

export default function App() {
  return (
    <form
      className="flex w-full flex-wrap md:flex-nowrap gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputOtp isRequired aria-label="OTP input field" length={4} placeholder="Enter code" />
    </form>
  );
}
