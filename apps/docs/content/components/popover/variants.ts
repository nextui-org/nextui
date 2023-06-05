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

  const variants = ["solid", "bordered", "flat", "faded", "shadow"];

  return (
    <div className="flex gap-2">
      {variants.map((variant) => (
        <Popover key={variant} placement="top" variant={variant}>
          <PopoverTrigger>
            <Button variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
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
