const App = `import {Pagination} from "@nextui-org/react";

export default function App() {

  const sizes = ["xs", "sm", "md", "lg", "xl"]

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {sizes.map((size) => (
        <Pagination total={10} initialPage={1} size={size} />
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
