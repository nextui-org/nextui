import {Alert} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {["solid", "bordered", "flat", "faded"].map((variant) => (
        <Alert
          key={variant}
          color="secondary"
          title={`This is a ${variant} variant alert`}
          variant={variant}
        />
      ))}
    </div>
  );
}
