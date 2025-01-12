import {Tooltip, Button} from "@heroui/react";

export default function App() {
  const placements = [
    "top-start",
    "top",
    "top-end",
    "bottom-start",
    "bottom",
    "bottom-end",
    "left-start",
    "left",
    "left-end",
    "right-start",
    "right",
    "right-end",
  ];

  return (
    <div className="flex flex-wrap md:inline-grid md:grid-cols-3 gap-4">
      {placements.map((placement) => (
        <Tooltip key={placement} color="secondary" content={placement} placement={placement}>
          <Button className="capitalize" color="secondary" variant="flat">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
