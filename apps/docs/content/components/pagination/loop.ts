const App = `import {Pagination} from "@nextui-org/react";

export default function App() {
  return (
    <Pagination loop showControls color="success" total={5} initialPage={1} />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
