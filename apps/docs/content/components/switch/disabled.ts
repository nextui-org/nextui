const App = `import {Switch} from "@nextui-org/react";

export default function App() {
  return (
    <Switch isDisabled defaultSelected>
      Automatic updates
    </Switch>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
