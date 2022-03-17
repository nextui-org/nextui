const App = `import { Radio,Spacer } from '@nextui-org/react';
import React from 'react';
    
export default function App() {
  const [selected, setSelected] = React.useState('xs');      
  return <>
  <Radio
      checked={selected === 'xs'}
      onChange={() => setSelected('xs')}
      size="xs"
  >
      xs
  </Radio>
  <Spacer/>
  <Radio
      checked={selected === 'sm'}
      onChange={() => setSelected('sm')}
      size="sm"
  >
      small
  </Radio>
  <Spacer/>
  <Radio
      checked={selected === 'md'}
      onChange={() => setSelected('md')}
      size="md"
  >
      medium
  </Radio>
  <Spacer/>
  <Radio
      checked={selected === 'lg'}
      onChange={() => setSelected('lg')}
      size="lg"
  >
      large
  </Radio>
  <Spacer/>
  <Radio
      checked={selected === 'xl'}
      onChange={() => setSelected('xl')}
      size="xl"
  >
      xlarge
  </Radio>
</>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
