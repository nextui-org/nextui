const App = `import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function App() {
  const content = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-sm font-bold">Popover Content</div>
        <div className="text-xs">This is a content of the popover</div>
      </div>
    </PopoverContent>
  );

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
    <div className="inline-grid grid-cols-3 gap-4">
      {placements.map((placement) => (
        <Popover key={placement} placement={placement}>
          <PopoverTrigger>
            <Button variant="flat" color="primary">
              {placement.charAt(0).toUpperCase() + placement.slice(1)}
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>
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
