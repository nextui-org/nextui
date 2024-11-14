import {InputOtp} from "@nextui-org/react";

export default function App() {
  const sizes = ["sm", "md", "lg"];

  return (
    <div className="w-full flex flex-col gap-4">
      {sizes.map((size) => (
        <div
          key={size}
          className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        >
          <div className="text-foreground/60">size: {size}</div>
          <InputOtp length={4} size={size} />
        </div>
      ))}
    </div>
  );
}
