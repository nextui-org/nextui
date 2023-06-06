const App = `import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";

export default function App() {
  return (
    <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button color="primary">Customize</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-sm font-bold text-foreground" {...titleProps}>
              Dimensions
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input defaultValue="100%" label="Width" size="sm" variant="bordered" />
              <Input defaultValue="300px" label="Max. width" size="sm" variant="bordered" />
              <Input defaultValue="24px" label="Height" size="sm" variant="bordered" />
              <Input defaultValue="30px" label="Max. height" size="sm" variant="bordered" />
            </div>
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
