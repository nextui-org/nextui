const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Email Sent!!";
  const description ="You will get a reply soon";
  return (
    <div className="flex items-center justify-center w-screen">
          <Alert title = {title} description = {description}/>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
