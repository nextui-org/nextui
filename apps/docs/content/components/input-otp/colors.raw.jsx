import {InputOtp} from "@nextui-org/react";

export default function App() {
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="w-full flex flex-wrap gap-4">
      {colors.map((color) => (
        <div key={color}>
          <div className="text-default-500">color: {color}</div>
          <InputOtp color={color} length={4} />
        </div>
      ))}
    </div>
  );
}
