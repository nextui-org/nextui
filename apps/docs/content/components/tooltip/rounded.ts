const App = `import { Tooltip,Button } from '@nextui-org/react';
    
export default function App() {
  return <Tooltip content={'Developers love Next.js'} rounded color="primary">
  <Button auto flat>
    Do hover here
  </Button>
</Tooltip>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
