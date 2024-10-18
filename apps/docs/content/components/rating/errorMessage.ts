const App = `import {Rating} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex flex-col">
        <Rating isInvalid errorMessage={"Error message for the rating"} />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
