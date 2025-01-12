import {InputOtp} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <InputOtp description="This is description to the OTP component." length={4} />
    </div>
  );
}
