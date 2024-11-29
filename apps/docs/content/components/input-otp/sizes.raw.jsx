import {InputOtp} from "@nextui-org/react";

export default function App() {
  const sizes = ["sm", "md", "lg"];

  return (
    <div className="w-full flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col w-full">
          <div className="text-default-500">size: {size}</div>
          <InputOtp length={4} size={size} />
        </div>
      ))}
    </div>
  );
}
