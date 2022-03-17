const App = `import { Link } from '@nextui-org/react';
    
export default function App() {
  return (
  <NextLink href="/docs/components/button">
  <Link block color="secondary">Go to Button</Link>
</NextLink>
)}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
