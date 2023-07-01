const App = `import {Switch} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Switch defaultSelected size="sm">Small</Switch>
      <Switch defaultSelected size="md">Medium</Switch>
      <Switch defaultSelected size="lg">Large</Switch>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
