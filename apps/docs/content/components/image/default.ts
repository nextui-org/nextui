const App = `import { Image } from '@nextui-org/react';
    
export default function App() {
  return <Image src="https://images.unsplash.com/photo-1647311955462-d4e8a725e5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1509&q=80" alt="Default Image" width={500} height={400} />
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
