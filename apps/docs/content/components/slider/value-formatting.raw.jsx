import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      defaultValue={40}
      formatOptions={{style: "currency", currency: "JPY"}}
      label="Currency"
      showTooltip={true}
      tooltipValueFormatOptions={{style: "currency", currency: "JPY"}}
    />
  );
}
