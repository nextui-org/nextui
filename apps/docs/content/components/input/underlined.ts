const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input 
          underlined 
          labelPlaceholder="Default" 
          color="default" />
      </Grid>
      <Grid>
        <Input 
          underlined 
          labelPlaceholder="Primary" 
          color="primary" 
        />
      </Grid>
      <Grid>
        <Input 
          underlined 
          labelPlaceholder="Secondary" 
          color="secondary" 
        />
      </Grid>
      <Grid>
        <Input 
          underlined 
          labelPlaceholder="Success" 
          color="success" 
        />
      </Grid>
      <Grid>
        <Input 
          underlined 
          labelPlaceholder="Warning" 
          color="warning" 
        />
      </Grid>
      <Grid>
        <Input 
          underlined 
          labelPlaceholder="Error" 
          color="error" 
        />
      </Grid>
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
