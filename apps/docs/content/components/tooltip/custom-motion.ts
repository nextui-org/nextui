const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Tooltip 
      content="I am a tooltip"
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              opacity: {duration: 0.1, easings: "easeInOut"},
            },
          },
          enter: {
            opacity: 1,
            transition: {
              opacity: {easings: "easeOut", duration: 0.15},
            },
          },
        },
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
