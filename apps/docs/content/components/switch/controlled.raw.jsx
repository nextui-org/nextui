import {Switch} from "@heroui/react";

export default function App() {
  const [isSelected, setIsSelected] = React.useState(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch isSelected={isSelected} onValueChange={setIsSelected}>
        Airplane mode
      </Switch>
      <p className="text-small text-default-500">Selected: {isSelected ? "true" : "false"}</p>
    </div>
  );
}
