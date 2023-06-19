const App = `import {Pagination} from "@nextui-org/react";

export default function App() {
  return (
    <Pagination isCompact showControls total={10} initialPage={1} />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
