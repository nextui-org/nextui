const App = `
import React from "react";
import {FileUpload} from "@nextui-org/react";
import {filesFromApi} from "./filesFromApi";

const filesFromApi= new Promise((res) => {
  res([
    new File(['dummy content'], "file1.jpg", {type: "image/jpeg"}),
    new File(['dummy content'], "file2.jpg", {type: "image/jpeg"}),
    new File(['dummy content'], "file3.jpg", {type: "image/jpeg"}),
  ]);
});

export default function App() {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    filesFromApi.then(files => setFiles(files));
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
