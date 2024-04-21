const App = `import {DatePicker} from "@nextui-org/react";

export default function App() {
  const placements = [
    "inside",
    "outside",
    "outside-left",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <DatePicker 
              label={"Birth date"} 
              className="max-w-[284px]"
              description={placement}
              labelPlacement={placement}
            />
          ))}
        </div>
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
