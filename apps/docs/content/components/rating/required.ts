const App = `import {Rating} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col">
    <Rating isRequired length={5} />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
