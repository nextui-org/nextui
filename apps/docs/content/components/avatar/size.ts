const App = `import { Avatar, Grid } from '@nextui-org/react';

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Avatar text="JR" size="xs" />
      </Grid>
      <Grid>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="sm"
        />
      </Grid>
      <Grid>
        <Avatar text="Joe" size="md" />
      </Grid>
      <Grid>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size="lg"
        />
      </Grid>
      <Grid>
        <Avatar text="John" size="xl" />
      </Grid>
      <Grid>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          css={{ size: "$20" }}
        />
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
