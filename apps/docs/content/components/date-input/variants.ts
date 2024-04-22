const App = `import {DateInput} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";

export default function App() {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <DateInput variant={variant} label={"Birth date"} placeholderValue={new CalendarDate(1995, 11, 6)}  />
        </div>
      ))}  
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
