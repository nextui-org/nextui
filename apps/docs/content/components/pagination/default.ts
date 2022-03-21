const App = `import { Pagination } from "@nextui-org/react";

export default function App() {
  return <Pagination total={20} initialPage={1} />;
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};

