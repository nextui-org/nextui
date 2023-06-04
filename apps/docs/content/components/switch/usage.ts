const App = `import {Switch} from "@nextui-org/react";

export default function App() {
  return (
    <Switch defaultSelected aria-label="Automatic updates"/>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
