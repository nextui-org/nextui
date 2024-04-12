const App = `import {TimeInput} from "@nextui-org/react";

export default function App() {
  return (
    <TimeInput 
      label="Event Time"
      description="Please enter your birth date" 
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
