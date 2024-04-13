const App = `import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-col items-end gap-4">
      <TimeInput 
        label="Event Time" 
        labelPlacement="inside" 
        defaultValue={new Time(11, 45)} 
        description="inside" 
      />
      <TimeInput 
        label="Event Time" 
        labelPlacement="outside" 
        defaultValue={new Time(11, 45)} 
        description="outside" 
      />
      <TimeInput 
        label="Event Time" 
        labelPlacement="outside-left" 
        defaultValue={new Time(11, 45)} 
        description="outside-left" 
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
