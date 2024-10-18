const App = `import {FileUpload} from "@nextui-org/react";

export default function App() {
  return (
    <FileUpload multiple onChange={(files) => { /* handle files */}} />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
