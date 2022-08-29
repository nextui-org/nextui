const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input 
          label="Text" 
          type="text" 
        />
      </Grid>
      <Grid>
        <Input 
          label="Password" 
          type="password" 
        />
      </Grid>
      <Grid>
        <Input 
          label="Search" 
          type="search" 
        />
      </Grid>
      <Grid>
        <Input 
          label="Number" 
          type="number" 
        />
      </Grid>
      <Grid>
        <Input 
          label="Url" 
          type="url" 
        />
      </Grid>
      <Grid>
        <Input 
          width="186px" 
          label="Time" 
          type="time" 
        />
      </Grid>
      <Grid>
        <Input 
          width="186px" 
          label="Date" 
          type="date" 
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
