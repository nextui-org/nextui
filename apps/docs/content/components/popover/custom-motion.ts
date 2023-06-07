const App = `import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Popover
      showArrow
      offset={10}
      placement="bottom"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            duration: 0.1,
            transition: {
              opacity: {
                duration: 0.15,
              },
            },
          },
          exit: {
            y: "10%",
            opacity: 0,
            duration: 0,
            transition: {
              opacity: {
                duration: 0.1,
              },
            },
          },
        },
      }}
    >
      <PopoverTrigger>
        <Button variant="flat">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-sm font-bold">Popover Content</div>
          <div className="text-xs">This is the popover content</div>
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
