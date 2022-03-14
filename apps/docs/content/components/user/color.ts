const App = `import { User } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Grid.Container gap={2}>
      <Grid>
        <User  src="/avatars/avatar-3.png" name="Ariana Wattson" bordered color="primary" />
      </Grid>
      <Grid>
        <User  src="/avatars/avatar-3.png" name="Ariana Wattson" bordered color="secondary" />
      </Grid>
      <Grid>
        <User  src="/avatars/avatar-3.png" name="Ariana Wattson" bordered color="success" />
      </Grid>
      <Grid>
        <User  src="/avatars/avatar-3.png" name="Ariana Wattson" bordered color="warning" />
      </Grid>
      <Grid>
        <User  src="/avatars/avatar-3.png" name="Ariana Wattson" bordered color="error" />
      </Grid>
   </Grid.Container>
  </>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
