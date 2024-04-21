const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider 
      label="Price Range"
      step={50} 
      minValue={0} 
      maxValue={1000} 
      defaultValue={[100, 500]} 
      formatOptions={{style: "currency", currency: "USD"}}
      className="max-w-md"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
