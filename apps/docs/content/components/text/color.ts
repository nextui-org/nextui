const App = `import { Text } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Text color="primary">
     Almost before we knew it, we had left the ground.
  </Text>
  <Text color="success">
     Almost before we knew it, we had left the ground.
  </Text>
  <Text color="warning">
     Almost before we knew it, we had left the ground.
  </Text>
  <Text color="secondary">
     Almost before we knew it, we had left the ground.
  </Text>
  <Text color="error">
     Almost before we knew it, we had left the ground.
  </Text>
  <Text color="#ff4ecd">
     Almost before we knew it, we had left the ground.
  </Text>
</>

}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
