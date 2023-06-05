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

  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "foreground",
  ];

  return (
    <div className="inline-grid grid-cols-4 gap-4">
      {colors.map((color) => (
        <Popover key={color} placement="top" color={color}>
          <PopoverTrigger>
            <Button variant="flat" color={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
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
