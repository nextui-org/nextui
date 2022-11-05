const App = `import { Badge, Avatar, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge color="error" content={5}>
          <Avatar
            bordered
            squared
            color="primary"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e29026707d"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge color="error" content={5} placement="bottom-right">
          <Avatar
            bordered
            squared
            color="primary"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e29026707e"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge color="error" content={5} placement="top-left">
          <Avatar
            bordered
            squared
            color="primary"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge color="error" content={5} placement="bottom-left">
          <Avatar
            bordered
            squared
            color="primary"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e290267073"
          />
        </Badge>
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
