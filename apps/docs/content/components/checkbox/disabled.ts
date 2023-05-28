const App = `import {Checkbox} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Checkbox isDisabled>Option</Checkbox>
      <Checkbox isDisabled defaultSelected>Option</Checkbox>
    </div>  
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
