const App = `import { Loading,Spacer } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Loading size="xs" />
  <Spacer />
  <Loading size="sm" />
  <Spacer />
  <Loading size="md" />
  <Spacer />
  <Loading size="lg" />
  <Spacer />
  <Loading size="xl" />
  <Spacer />
  {/* Note: If you want to use a custom size please see this */}
  <Loading
    loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
  />
  </>

}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};

