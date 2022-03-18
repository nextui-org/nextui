const App = `import { Image, Spacer, Text } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Image
        src="http://placehold.jp/150x150.png"
        alt="Default Image"
        width={150}
        height={150}
      />
      <Spacer />
      <Image
        src="http://placehold.jp/100x100.png"
        alt="Default Image"
        width={100}
        height={100}
      />
      <Spacer />
      <Image
        src="http://placehold.jp/50x50.png"
        alt="Default Image"
        width={50}
        height={50}
      />
    </>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
