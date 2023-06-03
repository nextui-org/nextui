const App = `import {Image} from "@nextui-org/react";

export default function App() {
  return (
    <Image
      isZoomed
      width={240}
      src="/images/fruit-1.jpeg"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
