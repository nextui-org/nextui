const App = `import { Link } from "@nextui-org/react";

export default function App() {
  return (
    <Link href="#">
      "First solve the problem. Then, write the code." - Jon Johnson.
    </Link>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
