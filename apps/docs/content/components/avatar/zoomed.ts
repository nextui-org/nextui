const App = `import { Avatar, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          zoomed
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          zoomed
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          zoomed
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a048581f4e29026701d"
          zoomed
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a092581d4ef9026700d"
          zoomed
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e25056704b"
          zoomed
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e290888704d"
          zoomed
        />
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
