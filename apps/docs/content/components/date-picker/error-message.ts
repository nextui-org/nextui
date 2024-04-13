const App = `import {DatePicker} from "@nextui-org/react";
import {CalendarDate, parseDate} from "@internationalized/date";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker 
        label="Birth date"
        className="max-w-[256px]"
        isInvalid
        errorMessage="Please enter a valid date."
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
