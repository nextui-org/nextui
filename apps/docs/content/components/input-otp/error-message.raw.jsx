import {InputOtp} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <InputOtp
        isInvalid
        errorMessage="This is custom error message for the OTP component."
        length={4}
      />
    </div>
  );
}
