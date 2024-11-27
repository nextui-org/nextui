import {DateRangePicker} from "@nextui-org/react";

export default function App() {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <DateRangePicker className="max-w-xs" label="Stay duration" variant={variant} />
        </div>
      ))}
    </div>
  );
}
