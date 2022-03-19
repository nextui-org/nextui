const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input 
          bordered 
          labelPlaceholder="Default" 
          color="default" />
      </Grid>
      <Grid>
        <Input 
          bordered 
          labelPlaceholder="Primary" 
          color="primary" />
      </Grid>
      <Grid>
        <Input 
          bordered 
          labelPlaceholder="Secondary" 
          color="secondary" />
      </Grid>
      <Grid>
        <Input 
          bordered 
          labelPlaceholder="Success" 
          color="success" />
      </Grid>
      <Grid>
        <Input 
          bordered 
          labelPlaceholder="Warning" 
          color="warning" />
      </Grid>
      <Grid>
        <Input 
          bordered 
          labelPlaceholder="Error" 
          color="error" />
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

