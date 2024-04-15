const App = `import {DateRangePicker} from "@nextui-org/react";

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
          <DateRangePicker
            key={placement}
            label="Stay duration"
            labelPlacement={placement}
            description={placement}
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
