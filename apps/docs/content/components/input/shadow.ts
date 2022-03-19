const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input 
          shadow={false} 
          labelPlaceholder="Default" 
          status="default" 
        />
      </Grid>
      <Grid>
        <Input 
          shadow={false} 
          labelPlaceholder="Primary" 
          status="primary" 
        />
      </Grid>
      <Grid>
        <Input 
          shadow={false} 
          labelPlaceholder="Secondary" 
          status="secondary" 
        />
      </Grid>
      <Grid>
        <Input 
          shadow={false} 
          labelPlaceholder="Success" 
          status="success" 
        />
      </Grid>
      <Grid>
        <Input 
          shadow={false} 
          labelPlaceholder="Warning" 
          status="warning" 
        />
      </Grid>
      <Grid>
        <Input 
          shadow={false} 
          labelPlaceholder="Error" 
          status="error" 
        />
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

