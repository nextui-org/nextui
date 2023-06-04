const App = `import {Switch} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Switch defaultSelected size="xs">Option</Switch>
      <Switch defaultSelected size="sm">Option</Switch>
      <Switch defaultSelected size="md">Option</Switch>
      <Switch defaultSelected size="lg">Option</Switch>
      <Switch defaultSelected size="xl">Option</Switch>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
