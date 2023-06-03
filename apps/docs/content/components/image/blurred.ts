const App = `import {Image} from "@nextui-org/react";

export default function App() {
  return (
    <Image
      isBlurred
      width={240}
      src="/images/album-cover.png"
      classNames="m-5"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
