const App = `import { Avatar,Grid } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container gap={2}>
  <Grid>
      <Avatar text="Primary" color="primary" textColor="white" />
  </Grid>
  <Grid>
      <Avatar text="Secondary" color="secondary" textColor="white" />
  </Grid>
  <Grid>
      <Avatar text="S" color="success" textColor="white" />
  </Grid>
  <Grid>
      <Avatar text="Warn" color="warning" textColor="white" />
  </Grid>
  <Grid>
      <Avatar text="Err" color="error" textColor="white" />
  </Grid>
  <Grid>
      <Avatar text="Grad" color="gradient" textColor="white" />
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
