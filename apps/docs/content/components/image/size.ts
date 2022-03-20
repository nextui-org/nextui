const App = `import { Image, Grid, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Image
          src="http://placehold.jp/50x50.png"
          alt="Default Image"
          width={50}
          height={50}
        />
      </Grid>
      <Grid>
        <Image
          src="http://placehold.jp/100x100.png"
          alt="Default Image"
          width={100}
          height={100}
        />
      </Grid> 
      <Grid>
        <Image
          src="http://placehold.jp/150x150.png"
          alt="Default Image"
          width={150}
          height={150}
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
