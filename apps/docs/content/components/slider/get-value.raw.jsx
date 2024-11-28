import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider
      className="max-w-md"
      getValue={(donuts) => `${donuts} of 60 Donuts`}
      label="Donuts to buy"
      maxValue={60}
      size="sm"
    />
  );
}
