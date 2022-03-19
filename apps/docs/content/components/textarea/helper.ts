const App = `import { Textarea, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2.5} css={{ mt: "4px" }}>
      <Grid>
        <Textarea
          label="Default"
          helperText="Please enter your name"
          placeholder="Enter your name"
        />
      </Grid>
      <Grid>
        <Textarea
          status="success"
          helperColor="success"
          initialValue="NextUI is a Beautiful, fast and modern React UI library 🚀."
          helperText="Excellent description"
          placeholder="Description"
          label="Success"
        />
      </Grid>
      <Grid>
        <Textarea
          bordered
          color="error"
          status="error"
          helperColor="error"
          helperText="Enter a larger description"
          label="Description"
          placeholder="Description"
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
