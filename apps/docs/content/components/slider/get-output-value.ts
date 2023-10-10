const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider 
      label="Donuts to buy"
      size="sm"
      maxValue={60}
      getOutputValue={(donuts) => \`\${donuts} of 60 Donuts\`}
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
