const App = `import { Input, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={4}>
      <Grid>
        <Input
          bordered
          labelLeft="https://"
          labelRight=".org"
          placeholder="nextui"
        />
      </Grid>
      <Grid>
        <Input 
          bordered 
          labelRight=".org" 
          placeholder="https://nextui" 
        />
      </Grid>
      <Grid>
        <Input 
          bordered 
          labelLeft="https://" 
          placeholder="nextui.org" 
        />
      </Grid>
      <Grid>
        <Input 
          labelLeft="username" 
          placeholder="getnextui" 
        />
      </Grid>
      <Grid>
        <Input 
          labelRight=".org" 
          placeholder="https://nextui" 
        />
      </Grid>
      <Grid>
        <Input 
          underlined 
          labelLeft="username" 
          placeholder="Next UI" 
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

