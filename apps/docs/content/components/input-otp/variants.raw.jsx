import {InputOtp} from "@nextui-org/react";

export default function App() {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-wrap gap-6">
      {variants.map((variant) => (
        <div
          key={variant}
          className="inline-flex flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        >
          <div className="text-foreground/60">variant: {variant}</div>
          <InputOtp length={4} variant={variant} />
        </div>
      ))}
    </div>
  );
}
