const App = `import { Progress,Grid } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container xs={12} sm={6} gap={2}>
  <Grid>
    <Progress value={50} color="primary" />
  </Grid>
  <Grid>
    <Progress value={30} color="secondary" />
  </Grid>
  <Grid>
    <Progress value={70} color="success" />
  </Grid>
  <Grid>
    <Progress value={90} color="warning" />
  </Grid>
  <Grid>
    <Progress value={10} color="error" />
  </Grid>
  <Grid>
    <Progress value={30} color="gradient" />
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
