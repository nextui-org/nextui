const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "This is an alert";
  const description = "Thanks for subscribing to our newsletter!";
  
  return (
    <div className="flex items-center justify-center w-full">
      <Alert title={title} description={description} />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
