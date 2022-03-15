const App = `import { Textarea  } from '@nextui-org/react';
    
export default function App() {
  return <Textarea
  label="Write your thoughts"
  placeholder="Enter your amazing ideas."
/>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
