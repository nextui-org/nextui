import {InputOtp} from "@nextui-org/react";

export default function App() {
  const allowedKeysConfig = [
    {
      name: "For below InputOtp, only lower-case alphabets (a to z) are allowed:",
      value: "^[a-z]$",
    },
    {
      name: "For below InputOtp, only upper-case alphabets (A to Z) are allowed:",
      value: "^[A-Z]$",
    },
  ];

  return (
    <div className="w-full flex flex-wrap gap-6">
      {allowedKeysConfig.map((config, idx) => (
        <div key={idx} className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="text-foreground/60">{config.name}</div>
          <InputOtp allowedKeys={config.value} length={4} />
        </div>
      ))}
    </div>
  );
}
