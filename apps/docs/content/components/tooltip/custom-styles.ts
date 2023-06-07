const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Tooltip 
      showArrow
      placement="right"
      content="I am a tooltip"
      classNames={{
        base: "py-2 px-4 shadow-xl text-black bg-gradient-to-br from-white to-neutral-400",
        arrow: "bg-neutral-400 dark:bg-white",
      }}
    >
      <Button variant="flat">Hover me</Button>
    </Tooltip>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
