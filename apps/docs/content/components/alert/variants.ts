const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Alert variant="solid">
        A solid variant alert
      </Alert>
      <Alert variant="bordered">
        A bordered variant alert
      </Alert>
      <Alert variant="flat">
        A flat variant alert
      </Alert>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
