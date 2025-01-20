import {InputOtp} from "@heroui/react";
import React from "react";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <InputOtp length={4} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-small">value: {value}</p>
    </div>
  );
}
