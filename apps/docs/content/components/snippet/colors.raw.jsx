import {Snippet} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet color="default">npm install @heroui/react</Snippet>
      <Snippet color="primary">npm install @heroui/react</Snippet>
      <Snippet color="secondary">npm install @heroui/react</Snippet>
      <Snippet color="success">npm install @heroui/react</Snippet>
      <Snippet color="warning">npm install @heroui/react</Snippet>
      <Snippet color="danger">npm install @heroui/react</Snippet>
    </div>
  );
}
