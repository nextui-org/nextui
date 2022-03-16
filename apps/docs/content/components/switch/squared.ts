const App = `import { Switch  } from '@nextui-org/react';
    
export default function App() {
  return <Switch squared color="primary" checked={true}>
  Squared option
</Switch>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
