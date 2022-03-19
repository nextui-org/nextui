const App = `import { Image } from "@nextui-org/react";

export default function App() {
  return (
    <Image src="/avatars/avatar-3.png" />
  );
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
