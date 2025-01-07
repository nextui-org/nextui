import {CircularProgress} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <CircularProgress aria-label="Loading..." color="default" />
      <CircularProgress aria-label="Loading..." color="primary" />
      <CircularProgress aria-label="Loading..." color="secondary" />
      <CircularProgress aria-label="Loading..." color="success" />
      <CircularProgress aria-label="Loading..." color="warning" />
      <CircularProgress aria-label="Loading..." color="danger" />
    </div>
  );
}
