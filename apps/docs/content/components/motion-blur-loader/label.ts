const App = `import {MotionBlurLoader} from "@nextui-org/react";

export default function App() {
  return (
    <MotionBlurLoader label="Loading..." color="warning" />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
