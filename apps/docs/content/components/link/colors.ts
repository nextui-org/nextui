const App = `import { Link } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Link href="#" color="foreground">Foreground</Link>
      <Link href="#" color="primary">Primary</Link>
      <Link href="#" color="secondary">Secondary</Link>
      <Link href="#" color="success">Success</Link>
      <Link href="#" color="warning">Warning</Link>
      <Link href="#" color="danger">Danger</Link>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
