import {InputOtp} from "@heroui/react";

export default function App() {
  const allowedKeysConfig = [
    {
      name: "Only lowercase letters (a-z):",
      value: "^[a-z]*$",
    },
    {
      name: "Only uppercase letters (A-Z):",
      value: "^[A-Z]*$",
    },
  ];

  return (
    <div className="w-full flex flex-wrap gap-6">
      {allowedKeysConfig.map((config, idx) => (
        <div key={idx}>
          <div className="text-default-500">{config.name}</div>
          <InputOtp allowedKeys={config.value} length={4} />
        </div>
      ))}
    </div>
  );
}
