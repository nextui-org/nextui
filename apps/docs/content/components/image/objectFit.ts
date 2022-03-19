const App = `import { Image, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <Image
        src="https://images.unsplash.com/photo-1647311955462-d4e8a725e5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1509&q=80"
        objectFit="fill"
        alt="Default Image"
        width={200}
        height={300}
      />
      <Spacer />
      <Image
        src="https://images.unsplash.com/photo-1647311955462-d4e8a725e5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1509&q=80"
        objectFit="cover"
        alt="Default Image"
        width={200}
        height={300}
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
