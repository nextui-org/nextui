import { useState } from 'react'
import logo from './logo.png'
import './App.css'
import {Button,Text,Link } from "@nextui-org/react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Text color="secondary"><p>Hello Vite + NextUI!</p></Text>
        <p>
          <Button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </Button>
        </p>
        <Text color="warning">
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        </Text>
        <p>
        <Link block color="warning" href="https://reactjs.org">Learn React</Link>
          {' | '}
          <Link block color="primary" href="https://vitejs.dev/guide/features.html">Vite Docs</Link>
          {' | '}
          <Link block color="error" href="https://nextui.org/">NextUI Docs</Link>
        </p>
      </header>
    </div>
  )
}

export default App
