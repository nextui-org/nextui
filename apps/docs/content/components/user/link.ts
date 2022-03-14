const App = `import { User } from '@nextui-org/react';
    
export default function App() {
  return <><User src="/avatars/avatar-3.png" name="Ariana Wattson"><User.Link href="https://nextui.org/">@profileLink</User.Link></User></>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
