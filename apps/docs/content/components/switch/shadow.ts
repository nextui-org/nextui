const App = `import { Switch,Grid  } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container gap={2}>
  <Grid>
      <Switch shadow color="primary" checked={true}/>
  </Grid>
  <Grid>
      <Switch shadow color="secondary" checked={true}/>
  </Grid>
  <Grid>
      <Switch shadow color="success" checked={true}/>
  </Grid>
  <Grid>
      <Switch shadow color="warning" checked={true}/>
  </Grid>
  <Grid>
      <Switch shadow color="error" checked={true}/>
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
