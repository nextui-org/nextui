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
        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        name="Jane Fisher"
        size="sm"
      />
      <Spacer />
      <User
        src="https://i.pravatar.cc/150?u=a048581f4e29026701d"
        name="William Howard"
        size="md"
      />
      <Spacer />
      <User
        src="https://i.pravatar.cc/150?u=a092581d4ef9026700d"
        name="Kristen Copper"
        size="lg"
      />
      <Spacer />
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        name="Tony Reichert"
        size="xl"
      />
    </>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
