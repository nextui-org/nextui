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
        const colorName = color.charAt(0).toUpperCase() + color.slice(1);
        return (
          <Tooltip key={color} color={color} content={colorName}>
            <Button variant="flat" color={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
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
