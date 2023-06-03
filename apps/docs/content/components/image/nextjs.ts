const App = `import {Image} from "@nextui-org/react";
import NextImage from "next/image";

export default function App() {
  return (
    <Image
      as={NextImage}
      width={300}
      height={200}
      src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      alt="NextUI hero Image"
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
