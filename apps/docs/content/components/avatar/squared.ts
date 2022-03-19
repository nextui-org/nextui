const App = `import { Avatar, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          color="primary"
          bordered
          squared
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          color="secondary"
          bordered
          squared
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          color="success"
          bordered
          squared
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a048581f4e29026701d"
          color="warning"
          bordered
          squared
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a092581d4ef9026700d"
          color="error"
          bordered
          squared
        />
      </Grid>
      <Grid>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e25056704b"
          color="gradient"
          bordered
          squared
        />
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
