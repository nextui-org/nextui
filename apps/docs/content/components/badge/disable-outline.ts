const App = `import { Badge, Avatar, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Badge color="error" content={5} shape="rectangle" size="md">
          <Avatar
            squared
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
          />
        </Badge>
      </Grid>
      <Grid>
        <Badge disableOutline color="error" content={5} shape="circle" size="md">
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
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
