const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider 
      label="Select a value" 
      color="foreground"
      size="sm"
      step={10} 
      marks={[
        {
          value: 20,
          label: "20%",
        },
        {
          value: 50,
          label: "50%",
        },
        {
          value: 80,
          label: "80%",
        },
      ]}
      defaultValue={20}
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
