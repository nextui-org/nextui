const App = `import { Tooltip, Grid, Link, Card, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Card variant="flat">
          <Card.Body>
            <Tooltip
              content={"Developers love Next.js"}
              trigger="click"
              color="primary"
            >
              <Link>
                Click me
              </Link>
            </Tooltip>
          </Card.Body>
        </Card>
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
  '/App.js': App
};

export default {
  ...react
};
