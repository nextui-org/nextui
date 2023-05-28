const App = `import {Button} from "@nextui-org/react";

export default function App() {
  return (
    <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      Button
    </Button>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
