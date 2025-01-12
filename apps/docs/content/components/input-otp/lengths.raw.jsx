import {InputOtp} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <p className="text-default-500 text-small mb-2">Basic length (4 digits)</p>
        <InputOtp length={4} />
      </div>

      <div>
        <p className="text-default-500 text-small mb-2">6 digits OTP</p>
        <InputOtp length={6} />
      </div>
    </div>
  );
}
