const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider 
      label="Select a value" 
      showTooltip={true}
      step={0.1} 
      formatOptions={{style: "percent"}}
      maxValue={1}
      minValue={0}
      marks={[
        {
          value: 0.2,
          label: "20%",
        },
        {
          value: 0.5,
          label: "50%",
        },
        {
          value: 0.8,
          label: "80%",
        },
      ]}
      defaultValue={0.2}
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
