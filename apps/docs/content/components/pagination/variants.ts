const App = `import {Pagination} from "@nextui-org/react";

export default function App() {

  const variants = ["flat", "bordered", "faded", "light"]

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {variants.map((variant) => (
        <Pagination total={10} initialPage={1} variant={variant} />
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
