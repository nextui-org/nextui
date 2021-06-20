import logo from './logo.svg';
import './App.css';
import { Spacer, Link, Button } from '@nextui-org/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>NextUI example with create-react-app</p>
        <Link
          color
          href="https://nextui.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sow NextUI React
        </Link>
        <Spacer />
        <Button>Action</Button>
      </header>
    </div>
  );
}

export default App;
