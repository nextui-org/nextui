const AppTs = `import {DatePicker} from "@nextui-org/react";
import {parseZonedDateTime, parseAbsoluteToLocal} from "@internationalized/date";

export default function App() {
  return (
     <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DatePicker
        label="Zoned Date Time"
        className="max-w-xs"
        defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
        labelPlacement="outside"
      />
      <DatePicker
        label="Zoned Date Time"
        className="max-w-xs"
        defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
        labelPlacement="outside"
      />
  </div>
  );
}`;

const react = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
