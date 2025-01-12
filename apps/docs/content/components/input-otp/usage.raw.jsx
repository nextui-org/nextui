import React from "react";
import {InputOtp} from "@heroui/react";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col items-start gap-2">
      <InputOtp length={4} value={value} onValueChange={setValue} />
      <div className="text-small text-default-500">
        OTP value: <span className="text-md font-medium">{value}</span>
      </div>
    </div>
  );
}
