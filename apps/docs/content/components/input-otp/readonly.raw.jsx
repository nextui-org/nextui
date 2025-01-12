import {InputOtp} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <InputOtp isReadOnly defaultValue="1234" length={4} />
    </div>
  );
}
