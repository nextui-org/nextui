import {Spinner} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Spinner color="default" label="Default" labelColor="foreground" />
      <Spinner color="primary" label="Primary" labelColor="primary" />
      <Spinner color="secondary" label="Secondary" labelColor="secondary" />
      <Spinner color="success" label="Success" labelColor="success" />
      <Spinner color="warning" label="Warning" labelColor="warning" />
      <Spinner color="danger" label="Danger" labelColor="danger" />
    </div>
  );
}
