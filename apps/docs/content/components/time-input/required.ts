const App = `import {TimeInput} from "@nextui-org/react";

export default function App() {
  return (
    <TimeInput 
      isRequired 
      label="Event Time" 
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
