import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  const colors = ["default", "primary", "secondary", "success", "warning", "danger", "foreground"];

  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => {
        return (
          <Tooltip key={color} className="capitalize" color={color} content={color}>
            <Button className="capitalize" color={color} variant="flat">
              {color}
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
}
