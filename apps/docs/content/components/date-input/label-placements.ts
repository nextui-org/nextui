const App = `import {DateInput} from "@nextui-org/react";

export default function App() {
  const placements = [
    "inside",
    "outside",
    "outside-left",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {placements.map((placement) => (
          <DateInput 
            label={"Birth date"} 
            placeholderValue={new CalendarDate(1995, 11, 6)} 
            description={placement}
            labelPlacement={placement}
          />
        ))}
      </div>  
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
