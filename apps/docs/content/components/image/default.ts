const App = `import { Image } from "@nextui-org/react";

export default function App() {
  return (
    <Image
      width={320}
      height={180}  
      src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
      alt="Default Image"
      objectFit="cover"
    />
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
