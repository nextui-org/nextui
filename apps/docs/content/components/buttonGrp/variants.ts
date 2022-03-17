const App = `import { Button } from '@nextui-org/react';
    
export default function App() {
  return (
  <>
    <Button.Group color="success">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="gradient" ghost>
      <Button>Action1</Button>
      <Button>Action2</Button>
      <Button>Action3</Button>
    </Button.Group>
    <Button.Group color="error" rounded>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="primary" bordered>
      <Button>Action1</Button>
      <Button>Action2</Button>
      <Button>Action3</Button>
    </Button.Group>
    <Button.Group color="warning" flat>
      <Button>Action1</Button>
      <Button>Action2</Button>
      <Button>Action2</Button>
    </Button.Group>
    <Button.Group color="secondary" size="sm">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group color="secondary" light>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  </>
)}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
