const App = `import { Tooltip, Grid, Link, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2} alignContent="center">
      <Grid css={{ dflex:"center" }}>
        <Tooltip
          content={"Developers love Next.js"}
          trigger="click"
          color="primary"
        >
          <Link>
            <Text b color="primary">
              Click me
            </Text>
          </Link>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content={"Developers love Next.js"}
          trigger="hover"
          color="secondary"
        >
          <Button auto flat color="secondary">
            Hover me
          </Button>
        </Tooltip>
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
