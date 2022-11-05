const App = `import { Textarea, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2.5} css={{ mt: "4px" }}>
      <Grid>
        <Textarea placeholder="Default Textarea" />
      </Grid>
      <Grid>
        <Textarea
          underlined
          color="primary"
          labelPlaceholder="Underlined Textarea"
        />
      </Grid>
      <Grid>
        <Textarea
          bordered
          color="secondary"
          labelPlaceholder="Bordered Textarea"
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
