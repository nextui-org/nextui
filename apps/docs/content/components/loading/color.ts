const App = `import { Loading,Grid } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container gap={2}>
  <Grid>
    <Loading color="primary">Primary</Loading>
  </Grid>
  <Grid>
    <Loading color="secondary">Secondary</Loading>
  </Grid>
  <Grid>
    <Loading color="success">Success</Loading>
  </Grid>
  <Grid>
    <Loading color="warning">Warning</Loading>
  </Grid>
  <Grid>
    <Loading color="error">Error</Loading>
  </Grid>
</Grid.Container>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};

