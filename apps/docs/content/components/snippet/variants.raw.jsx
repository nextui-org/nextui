import {Snippet} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet variant="bordered">npm install @heroui/react</Snippet>
      <Snippet color="warning" variant="flat">
        npm install @heroui/react
      </Snippet>
      <Snippet color="primary" variant="solid">
        npm install @heroui/react
      </Snippet>
      <Snippet color="secondary" variant="shadow">
        npm install @heroui/react
      </Snippet>
    </div>
  );
}
