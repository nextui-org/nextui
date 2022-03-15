const App = `import { User } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Grid.Container gap={2}>
      <Grid>
          <User  src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="xs" />
      </Grid>
      <Grid>
          <User  src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="sm" />
      </Grid>
      <Grid>
         <User  src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="md" />
      </Grid>
      <Grid>
          <User  src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="lg" />
      </Grid>
      <Grid>
           <User  src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" size="xl" />
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
