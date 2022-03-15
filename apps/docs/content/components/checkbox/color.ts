const App = `import { Checkbox,Spacer } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Checkbox color="primary" checked={true}>
     Primary
  </Checkbox>
  <Spacer/>
  <Checkbox color="secondary" checked={true}>
     Secondary
  </Checkbox>
   <Spacer/>
  <Checkbox color="success" checked={true}>
     Success
  </Checkbox>
   <Spacer/>
  <Checkbox color="warning" checked={true}>
     Warning
  </Checkbox>
   <Spacer/>
  <Checkbox color="error" checked={true}>
     Error
  </Checkbox>
   <Spacer/>
  <Checkbox color="gradient" checked={true}>
     Gradient
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
