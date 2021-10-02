import logo from './logo.svg';
import './App.css';
import { Text, Spacer, Button, Link } from '@nextui-org/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Text>NextUI example with create-react-app</Text>
        <Link
          color
          href="https://nextui.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Show NextUI React
        </Link>
        <Spacer />
        <Button>Action</Button>
      </header>
    </div>
  );
}

export default App;
