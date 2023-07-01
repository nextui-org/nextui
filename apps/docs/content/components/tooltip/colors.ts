const App = `import {Tooltip, Button} from "@nextui-org/react";

export default function App() {
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
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => {
        return (
          <Tooltip key={color} color={color} content={color} className="capitalize">
            <Button variant="flat" color={color} className="capitalize">
              {color}
            </Button>
          </Tooltip>
        )
      })}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
