const App = `import { Checkbox,Spacer } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Checkbox checked={true} size="xs">
     mini
  </Checkbox>
  <Spacer/>
  <Checkbox checked={true} size="sm">
     small
  </Checkbox>
   <Spacer/>
  <Checkbox checked={true} size="md">
     medium
  </Checkbox>
   <Spacer/>
  <Checkbox checked={true} size="lg">
     large
  </Checkbox>
   <Spacer/>
  <Checkbox checked={true} size="xl">
     xlarge
  </Checkbox>
  </>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
