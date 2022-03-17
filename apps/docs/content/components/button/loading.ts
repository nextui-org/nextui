const App = `import { Button,Grid,Loading } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container gap={2}>
  <Grid>
    <Button auto clickable={false} color="primary" css={{ px: '$13' }}>
      <Loading color="white" size="sm" />
    </Button>
  </Grid>
  <Grid>
    <Button auto clickable={false} color="secondary" css={{ px: '$13' }}>
      <Loading type="spinner" color="white" size="sm" />
    </Button>
  </Grid>
  <Grid>
    <Button auto clickable={false} color="success" css={{ px: '$13' }}>
      <Loading type="points" color="white" size="sm" />
    </Button>
  </Grid>
  <Grid>
    <Button auto clickable={false} color="warning" css={{ px: '$13' }}>
      <Loading type="points-opacity" color="white" size="sm" />
    </Button>
  </Grid>
  <Grid>
    <Button auto clickable={false} color="error" css={{ px: '$13' }}>
      <Loading type="spinner" color="white" size="sm" />
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
