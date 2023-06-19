const App = `import {Pagination} from "@nextui-org/react";

export default function App() {

  const colors = ["primary", "secondary", "success", "warning", "danger"]

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {colors.map((color) => (
        <Pagination total={10} initialPage={1} color={color} />
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
