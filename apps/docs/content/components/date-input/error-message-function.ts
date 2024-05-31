const App = `import {DateInput} from "@nextui-org/react";
import {CalendarDate, parseDate} from "@internationalized/date";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateInput 
        label={"Birth date"} 
        defaultValue={parseDate("2024-04-04")} 
        placeholderValue={new CalendarDate(1995, 11, 6)} 
        description={"Thiis is my birth date."}
        isInvalid
        errorMessage={(value) => {
          if (value.isInvalid) {
            return "Please enter a valid date.";
          }
        }}
        className="max-w-xs"
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
