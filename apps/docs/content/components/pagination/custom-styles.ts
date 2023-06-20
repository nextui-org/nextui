const App = `import {Pagination, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Pagination
      total={10}
      classNames={{
        base: "gap-0 rounded border-2 border-default",
        item: "w-8 h-8 text-sm rounded-none bg-transparent",
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
