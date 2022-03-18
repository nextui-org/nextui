const App = `import { User } from "@nextui-org/react";

export default function App() {
  return (
    <User
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      name="Ariana Wattson"
      pointer
    />
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
