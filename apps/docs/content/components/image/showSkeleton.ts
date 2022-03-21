const App = `import { Image } from "@nextui-org/react";

export default function App() {
  return (
    <Image   
      showSkeleton
      width={320}
      height={180}  
      maxDelay={10000}
      src="http://www.deelay.me/10000/https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
      alt="Default Image"
    />
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
