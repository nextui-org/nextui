const App = `
import {FileUpload} from "@nextui-org/react";

export default function App() {
  return (
    <FileUpload
      fileItemElement={(file) => <div className="text-red-500">{file.name}</div>}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
