const App = `
import {FileUpload} from "@nextui-org/react";

export default function App() {
  return (
    <FileUpload
      multiple
      buttons={(onBrowse, onAdd, onReset) => {
        return <div>
          <Button onClick={() => onBrowse()}>Browse Files</Button>
          <Button onClick={() => onAdd()}>Add New File</Button>
          <Button onClick={() => onReset()}>Remove All</Button>
        </div>
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
