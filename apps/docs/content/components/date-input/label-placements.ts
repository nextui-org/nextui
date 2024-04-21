const App = `import {DateInput} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";

export default function App() {
  const placements = [
    "inside",
    "outside",
    "outside-left",
  ];

  return (
    <div className="w-full flex flex-col max-w-sm gap-4">
      {placements.map((placement) => (
        <DateInput 
          label="Birth date" 
          placeholderValue={new CalendarDate(1995, 11, 6)} 
          description={placement}
          labelPlacement={placement}
        />
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
