const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState(25);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        aria-label="Volume"
        size="lg"
        color="secondary"
        onChangeEnd={setValue}
        className="max-w-md"
      />
      <p className="text-default-500 font-medium text-small">Current volume: {value}</p>
    </div>
  );
}`;

const AppTs = `import {Slider, SliderValue} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState<SliderValue>(25);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider 
        aria-label="Volume"
        size="lg"
        color="secondary"
        defaultValue={70}
        onChangeEnd={setValue}
        className="max-w-md"
      />
      <p className="text-default-500 font-medium text-small">Current volume: {value}</p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
