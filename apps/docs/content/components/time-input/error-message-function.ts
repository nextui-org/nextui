const App = `import {TimeInput} from "@nextui-org/react";

export default function App() {
  return (
    <TimeInput 
      label="Event Time"
      isInvalid
      errorMessage={(value) => {
        if (value.isInvalid) {
          return "Please enter a valid time";
        }
      }}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
