const App = `
import {FileUpload} from "@nextui-org/react";
import {SearchIcon, DeleteIcon} from "@nextui-org/shared-icons";

export default function App() {
  return (
    <FileUpload
      multiple
      browseButton={<Button><SearchIcon /></Button>}
      uploadButton={<Button onClick={() => alert("Files to upload are:\n" + files.map(file => file.name).join("\n"));}>Upload Files</Button>}
      addButton={<Button>+</Button>}
      resetButton={<Button><DeleteIcon /></Button>}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
