const App = `import { Spinner } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Spinner label="default" color="default" labelColor="foreground"/>
      <Spinner label="Primary" color="primary" labelColor="primary"/>
      <Spinner label="Secondary" color="secondary" labelColor="secondary"/>
      <Spinner label="Success" color="secondary" labelColor="success"/>
      <Spinner label="Warning" color="warning" labelColor="warning"/>
      <Spinner label="Danger" color="danger" labelColor="danger"/>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
