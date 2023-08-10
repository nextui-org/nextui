const App = `import {Pagination} from "@nextui-org/react";

export default function App() {

  const radius = ["full", "xl", "lg", "md", "sm", "base", "none"]

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {radius.map((r) => (
        <Pagination key={r} total={10} initialPage={1} radius={r} />
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
