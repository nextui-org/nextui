import './App.css';
import { Container, Link, Button } from '@nextui-org/react';

function App() {
  return (
    <Container className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-7xl mb-10 font-bold">
        Welcome to&nbsp;
        <Link href="https://tailwindcss.com/" rel="noreferer" target="_blank">
          tailwindcss
        </Link>
        &nbsp;+&nbsp;
        <Link
          href="https://v1.nextui.org?utm_source=with-tailwindcss-example"
          target="_blank"
        >
          NextUI
        </Link>
      </h1>
      <Button
        href="https://v1.nextui.org?utm_source=with-tailwindcss-example"
        target="_blank"
        as="a"
      >
        Go to NextUI
      </Button>
    </Container>
  );
}

export default App;
