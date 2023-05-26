const App = `import { Chip } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Chip onClose={() => console.log("close")}>Chip</Chip>
      <Chip onClose={() => console.log("close")} variant="bordered">
        Chip
      </Chip>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
