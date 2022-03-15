const App = `import { Progress,Grid } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container xs={12} sm={6} gap={2}>
  <Grid>
    <Progress squared color="primary" value={200} max={250} />
  </Grid>
  <Grid>
    <Progress squared color="primary" value={45} />
  </Grid>
  <Grid>
    <Progress squared color="primary" value={29} />
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
