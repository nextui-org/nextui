const App = `import {FileUpload, FileUploadTopbar} from "@nextui-org/react";

export default function App() {
  return (
    <FileUpload topbar={<FileUploadTopbar maxAllowedSize="1 MB" />} />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
