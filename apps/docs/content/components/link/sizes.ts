const App = `import { Link } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link href="#" size="xs">Link</Link>
      <Link href="#" size="sm">Link</Link>
      <Link href="#" size="md">Link</Link>
      <Link href="#" size="lg">Link</Link>
      <Link href="#" size="xl">Link</Link>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
