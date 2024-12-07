import {Progress} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Progress aria-label="Loading..." color="default" value={70} />
      <Progress aria-label="Loading..." color="primary" value={70} />
      <Progress aria-label="Loading..." color="secondary" value={70} />
      <Progress aria-label="Loading..." color="success" value={70} />
      <Progress aria-label="Loading..." color="warning" value={70} />
      <Progress aria-label="Loading..." color="danger" value={70} />
    </div>
  );
}
