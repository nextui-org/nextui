const App = `import { Badge, Avatar, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container>
      <Grid.Container alignItems="center" gap={1}>
        <Grid>
          <Badge size="xs">New (xs)</Badge>
        </Grid>
        <Grid>
          <Badge size="sm">New (sm)</Badge>
        </Grid>
        <Grid>
          <Badge size="md">New (md)</Badge>
        </Grid>
        <Grid>
          <Badge size="lg">New (lg)</Badge>
        </Grid>
        <Grid>
          <Badge size="xl">New (xl)</Badge>
        </Grid>
      </Grid.Container>
      <Spacer y={0.5} />
      <Grid.Container gap={1}>
        <Grid>
          <Badge disableOutline content="xs" size="xs">
            <Avatar
              squared
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e29026707d"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge disableOutline content="sm" size="sm">
            <Avatar
              squared
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e29026707e"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge disableOutline content="md" size="md">
            <Avatar
              squared
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e290267072"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge disableOutline content="lg" size="lg">
            <Avatar
              squared
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e290267073"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge disableOutline content="xl" size="xl">
            <Avatar
              squared
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e290267071"
            />
          </Badge>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
}
`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
