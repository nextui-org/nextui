import {Snippet} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet variant="bordered">npm install @nextui-org/react</Snippet>
      <Snippet color="warning" variant="flat">
        npm install @nextui-org/react
      </Snippet>
      <Snippet color="primary" variant="solid">
        npm install @nextui-org/react
      </Snippet>
      <Snippet color="secondary" variant="shadow">
        npm install @nextui-org/react
      </Snippet>
    </div>
  );
}
