const App = `import {MotionBlurLoader} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <MotionBlurLoader color="default"/>
      <MotionBlurLoader color="primary"/>
      <MotionBlurLoader color="secondary"/>
      <MotionBlurLoader color="success"/>
      <MotionBlurLoader color="warning"/>
      <MotionBlurLoader color="danger"/>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
