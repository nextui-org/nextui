const App = `import {CircularProgress} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <CircularProgress size="sm" aria-label="Loading..."/>
      <CircularProgress size="md" aria-label="Loading..."/>
      <CircularProgress size="lg" aria-label="Loading..."/>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
