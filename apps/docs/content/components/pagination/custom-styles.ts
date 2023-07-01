const App = `import {Pagination, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Pagination
      total={10}
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
      }}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
