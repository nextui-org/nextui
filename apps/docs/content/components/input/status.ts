const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input 
          labelPlaceholder="Default" 
          status="default" 
        />
      </Grid>
      <Grid>
        <Input 
          labelPlaceholder="Primary" 
          status="primary" 
        />
      </Grid>
      <Grid>
        <Input 
          labelPlaceholder="Secondary" 
          status="secondary" 
        />
      </Grid>
      <Grid>
        <Input 
          labelPlaceholder="Success" 
          status="success" 
        />
      </Grid>
      <Grid>
        <Input 
          labelPlaceholder="Warning" 
          status="warning" 
        />
      </Grid>
      <Grid>
        <Input 
          labelPlaceholder="Error" 
          status="error" 
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
