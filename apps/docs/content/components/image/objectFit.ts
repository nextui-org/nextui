const App = `import { Image, Grid, Spacer } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Image
          src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
          objectFit="none"
          alt="Default Image"
          width={200}
          height={300}
        />
      </Grid>
      <Grid>
        <Image
          src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
          objectFit="cover"
          alt="Default Image"
          width={200}
          height={300}
        />
      </Grid>
      <Grid>
        <Image
          src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
          objectFit="fill"
          alt="Default Image"
          width={200}
          height={300}
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
