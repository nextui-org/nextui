import {InputOtp} from "@heroui/react";

export default function App() {
  const radiusValues = ["none", "sm", "md", "lg", "full"];

  return (
    <div className="w-full flex flex-wrap gap-6">
      {radiusValues.map((radius) => (
        <div key={radius}>
          <div className="text-default-500">radius: {radius}</div>
          <InputOtp length={4} radius={radius} />
        </div>
      ))}
    </div>
  );
}
