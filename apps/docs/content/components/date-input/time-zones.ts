const App = `import {DateInput} from "@nextui-org/react";
import {parseZonedDateTime, parseAbsoluteToLocal} from "@internationalized/date";

export default function App() {
  return (
     <div className="w-full max-w-xl flex flex-col items-end gap-4">
      <DateInput
        label={"Event date"}
        defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
        labelPlacement="outside"
      />
      <DateInput
        label={"Event date"}
        defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
        labelPlacement="outside"
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
