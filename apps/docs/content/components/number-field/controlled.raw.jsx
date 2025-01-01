import {NumberField} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState();

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <NumberField
        label="Width"
        placeholder="Enter the width"
        value={value}
        onValueChange={setValue}
      />
      <p className="text-default-500 text-small">NumberField value: {value}</p>
    </div>
  );
}
