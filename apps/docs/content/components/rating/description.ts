const App = `import {Rating} from "@nextui-org/react";
export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Rating length={5} description={"Description to the rating component"} />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
