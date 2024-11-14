import {InputOtp} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col items-start gap-4">
      <InputOtp color="primary" length={4} size="lg" value={value} onValueChange={setValue} />
      <div className="text-sm">
        OTP value: <span className="text-md font-medium">{value}</span>
      </div>
    </div>
  );
}
