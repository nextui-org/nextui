import {Slider} from "@nextui-org/react";

export default function App() {
  return (
    <Slider
      aria-label="Player progress"
      className="max-w-md"
      color="foreground"
      defaultValue={20}
      hideThumb={true}
    />
  );
}
