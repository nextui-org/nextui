const App = `import {Tooltip, Button} from "@nextui-org/react";

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
        <Tooltip
          key={placement}
          placement={placement}
          content={placement}
          color="secondary"
        >
          <Button variant="flat" color="secondary">
            {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
