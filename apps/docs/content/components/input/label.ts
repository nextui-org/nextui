const App = `import { Input  } from '@nextui-org/react';
    
export default function App() {
  return (
    <Input 
    label="Full Name" 
    placeholder="Guillermo Rauch"
    />
    );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};

