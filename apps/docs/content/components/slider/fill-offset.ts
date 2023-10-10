const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider 
      label="Exposure" 
      size="sm"
      color="warning"
      step={0.01} 
      maxValue={5} 
      minValue={-5} 
      fillOffset={0}
      defaultValue={1.5}
      className="max-w-md"
      formatOptions={{signDisplay: 'always'}}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
