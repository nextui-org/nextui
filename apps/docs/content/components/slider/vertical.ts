const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-row  max-w-md h-[348px] gap-6 w-full">
      <Slider   
        size="sm"
        step={0.01} 
        maxValue={1} 
        minValue={0} 
        orientation="vertical"
        aria-label="Temperature"
        defaultValue={0.2}
      />
      <Slider   
        size="md"
        step={0.01} 
        maxValue={1} 
        minValue={0} 
        orientation="vertical"
        aria-label="Temperature"
        defaultValue={0.4}
      />
      <Slider   
        size="lg"
        step={0.01} 
        maxValue={1} 
        minValue={0} 
        orientation="vertical"
        aria-label="Temperature"
        defaultValue={0.6}
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
