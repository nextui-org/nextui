const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">Custom Content</div>
          <div className="text-tiny">This is a custom tooltip content</div>
        </div>
      }
    >
      <Button variant="bordered">
        Hover me
      </Button>
    </Tooltip>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
