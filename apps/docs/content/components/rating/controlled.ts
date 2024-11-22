const App = `import {Rating} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("0");
  return (<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Rating length={5} precision={0.5} onValueChange={setValue} />
      <div className="text-default-500 text-small">Rating value: {value}</div>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
