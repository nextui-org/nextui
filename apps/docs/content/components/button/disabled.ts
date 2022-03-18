const App = `import { Button } from '@nextui-org/react';
    
export default function App() {
  return (
    <Button disabled>
    Disabled
    </Button>
    );
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
