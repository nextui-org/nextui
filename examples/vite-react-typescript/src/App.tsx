import { useState } from 'react';
import {
  Button,
  Text,
  Link,
  NextUIProvider,
  createTheme,
  Container,
  Spacer
} from '@nextui-org/react';

const theme = createTheme({
  type: 'light'
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <NextUIProvider theme={theme}>
      <Container
        className="App"
        css={{
          dflex: 'center',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <img src="/logo.png" className="App-logo" alt="NextUI logo" />
        <Spacer y={0.5} />
        <Text h1>Hello Vite + NextUI!</Text>
        <Spacer y={0.5} />
        <Button type="button" onClick={() => setCount((count) => count + 1)}>
          Count is: {count}
        </Button>
        <Text css={{ my: '$8' }}>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </Text>
        <Text>
          <Link block href="https://reactjs.org">
            Learn React
          </Link>
          {' | '}
          <Link
            block
            color="primary"
            href="https://vitejs.dev/guide/features.html"
          >
            Vite Docs
          </Link>
          {' | '}
          <Link block href="https://nextui.org/">
            NextUI Docs
          </Link>
        </Text>
      </Container>
    </NextUIProvider>
  );
}

export default App;
