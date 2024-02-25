const App = `import {MotionBlurLoader} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <MotionBlurLoader label="Default" color="default" labelColor="foreground"/>
      <MotionBlurLoader label="Primary" color="primary" labelColor="primary"/>
      <MotionBlurLoader label="Secondary" color="secondary" labelColor="secondary"/>
      <MotionBlurLoader label="Success" color="success" labelColor="success"/>
      <MotionBlurLoader label="Warning" color="warning" labelColor="warning"/>
      <MotionBlurLoader label="Danger" color="danger" labelColor="danger"/>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
