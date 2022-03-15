const App = `import { Button,Grid } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container gap={2}>
  <Grid>
    <Button shadow color="primary" auto>
        Primary
    </Button>
  </Grid>
  <Grid>
    <Button shadow color="secondary" auto>
        Secondary
    </Button>
  </Grid>
  <Grid>
    <Button shadow color="success" auto>
        Success
    </Button>
  </Grid>
  <Grid>
    <Button shadow color="warning" auto>
        Warning
    </Button>
  </Grid>
  <Grid>
    <Button shadow color="error" auto>
        Error
    </Button>
  </Grid>
  <Grid>
    <Button shadow color="gradient" auto>
        Gradient
    </Button>
  </Grid>
</Grid.Container>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
