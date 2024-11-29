import {InputOtp} from "@nextui-org/react";

export default function App() {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-wrap gap-4">
      {variants.map((variant) => (
        <div key={variant}>
          <div className="text-default-500">variant: {variant}</div>
          <InputOtp length={4} variant={variant} />
        </div>
      ))}
    </div>
  );
}
