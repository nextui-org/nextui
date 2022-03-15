const App = `import { Progress,Grid } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container xs={12} sm={6} gap={2}>
  <Grid>
    <Progress color="primary" value={75} />
  </Grid>
  <Grid>
    <Progress color="primary" value={55} />
  </Grid>
  <Grid>
    <Progress color="primary" value={35} />
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
