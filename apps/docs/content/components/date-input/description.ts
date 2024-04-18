const App = `import {DateInput} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateInput 
        label={"Birth date"} 
        placeholderValue={new CalendarDate(1995, 11, 6)} 
        description={"This is my birth date."}
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
