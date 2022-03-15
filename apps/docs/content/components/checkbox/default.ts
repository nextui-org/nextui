const App = `import { Checkbox } from '@nextui-org/react';
    
export default function App() {
  return <Checkbox checked={true}>
  Option
</Checkbox>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
