import {InputOtp} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <InputOtp length={4} radius="full" size="sm" type="password" variant="bordered" />
    </div>
  );
}
