const App = `import {MotionBlurLoader} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <MotionBlurLoader size="xs" />
      <MotionBlurLoader size="sm" />
      <MotionBlurLoader size="md" />
      <MotionBlurLoader size="lg" />
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
