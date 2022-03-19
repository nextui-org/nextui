const App = `import { User, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Ariana Wattson"
        size="xs"
      />
      <Spacer />
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Ariana Wattson"
        size="sm"
      />
      <Spacer />
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Ariana Wattson"
        size="md"
      />
      <Spacer />
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Ariana Wattson"
        size="lg"
      />
      <Spacer />
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Ariana Wattson"
        size="xl"
      />
    </>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
