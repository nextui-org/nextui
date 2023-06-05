const App = `import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-sm font-bold">Popover Content</div>
          <div className="text-xs">This is a content of the popover</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
