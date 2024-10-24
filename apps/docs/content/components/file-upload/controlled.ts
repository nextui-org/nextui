const App = `
import {FileUpload} from "@nextui-org/react";
import {useEffect} from "react";

const filesFromApi = async () => {
  return [
    new File([], "file1", {type: "jpg"}),
    new File([], "file2", {type: "jpg"}),
    new File([], "file3", {type: "jpg"}),
  ];
}

export default function App() {
  const [files, setFiles] = useState<File[]>();

  useEffect(() => {
    filesFromApi().then(files => setFiles(files));
  }, []);

  return (
    <FileUpload files={files} />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
