import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Tooltip
      closeDelay={0}
      content="I am a tooltip"
      delay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      <Button variant="flat">Hover me</Button>
    </Tooltip>
  );
}
