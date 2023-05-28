const App = `import {CircularProgress} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <CircularProgress color="default" aria-label="Loading..."/>
      <CircularProgress color="primary" aria-label="Loading..."/>
      <CircularProgress color="secondary" aria-label="Loading..."/>
      <CircularProgress color="success" aria-label="Loading..."/>
      <CircularProgress color="warning" aria-label="Loading..."/>
      <CircularProgress color="danger" aria-label="Loading..."/>
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
