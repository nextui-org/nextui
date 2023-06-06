const App = `import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Popover 
      showArrow
      backdrop="opaque"
      placement="right"
      classNames={{
        base: "py-3 px-4 bg-gradient-to-br from-white to-default-300 dark:from-default-50 dark:to-default-200",
        arrow: "bg-default-200",
      }}
    >
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-sm font-bold" {...titleProps}>
              Popover Content
            </h3>
            <div className="text-xs">This is a content of the popover</div>
          </div>
        )}
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
