const App = `import { Avatar, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Avatar 
          squared 
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </Grid>
      <Grid>
        <Avatar 
          squared 
          text="Junior" />
      </Grid>
      <Grid>
        <Avatar 
          squared 
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      </Grid>
      <Grid>
        <Avatar 
          squared 
          text="Jane" />
      </Grid>
      <Grid>
        <Avatar 
          squared 
          src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      </Grid>
      <Grid>
        <Avatar 
          squared 
          text="Joe" />
      </Grid>
    </Grid.Container>
  );
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
