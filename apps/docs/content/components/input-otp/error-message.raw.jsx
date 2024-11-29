import {InputOtp} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <InputOtp isInvalid errorMessage="Invalid OTP code" length={4} />
    </div>
  );
}
