const App = `import {DatePicker} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker 
        label="Placement start"
        selectorButtonPlacement="start"
      />
      <DatePicker 
        label="Placement end (default)"
        selectorButtonPlacement="end"
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
