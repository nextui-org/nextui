const App = `import {DatePicker} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <DatePicker 
          label="Birth date"
          className="max-w-[284px]"
          isReadOnly
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
