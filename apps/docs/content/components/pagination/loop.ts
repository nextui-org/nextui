const App = `import { Pagination  } from '@nextui-org/react';
    
export default function App() {
  return (
    <Pagination loop color="success" total={10} initialPage={6} />
    );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
