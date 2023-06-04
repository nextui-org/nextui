const App = `import {Switch} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Switch defaultSelected color="default">Default</Switch>
      <Switch defaultSelected color="primary">Primary</Switch>
      <Switch defaultSelected color="secondary">Secondary</Switch>
      <Switch defaultSelected color="success">Success</Switch>
      <Switch defaultSelected color="warning">Warning</Switch>
      <Switch defaultSelected color="danger">Danger</Switch>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
