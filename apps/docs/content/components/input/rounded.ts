const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input
          rounded
          bordered
          label="Default"
          placeholder="Default"
          color="default"
        />
      </Grid>
      <Grid>
        <Input
          rounded
          bordered
          label="Primary"
          placeholder="Primary"
          color="primary"
        />
      </Grid>
      <Grid>
        <Input
          rounded
          bordered
          label="Secondary"
          placeholder="Secondary"
          color="secondary"
        />
      </Grid>
      <Grid>
        <Input
          rounded
          bordered
          label="Success"
          placeholder="Success"
          color="success"
        />
      </Grid>
      <Grid>
        <Input
          rounded
          bordered
          label="Warning"
          placeholder="Warning"
          color="warning"
        />
      </Grid>
      <Grid>
        <Input
          rounded
          bordered
          label="Error"
          placeholder="Error"
          color="error"
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

