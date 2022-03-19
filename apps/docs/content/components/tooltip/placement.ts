const App = `import { Tooltip, Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2} justify="center" alignContent="center">
      <Grid xs={4} justify="flex-end">
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="topStart"
        >
          <Button auto color="foreground" light>
            topStart
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={4} justify="center">
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="top"
        >
          <Button auto color="foreground" light>
            top
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={4}>
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="topEnd"
        >
          <Button auto color="foreground" light>
            topEnd
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={3} justify="flex-end">
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="leftStart"
        >
          <Button auto color="foreground" light>
            leftStart
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={6} />
      <Grid xs={3}>
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="rightStart"
        >
          <Button auto color="foreground" light>
            rightStart
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={3} justify="flex-end">
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="left"
        >
          <Button auto color="foreground" light>
            left
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={6} />
      <Grid xs={3}>
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="right"
        >
          <Button auto color="foreground" light>
            right
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={3} justify="flex-end">
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="leftEnd"
        >
          <Button auto color="foreground" light>
            leftEnd
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={6} />
      <Grid xs={3}>
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="rightEnd"
        >
          <Button auto color="foreground" light>
            rightEnd
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={4} justify="flex-end">
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="bottomStart"
        >
          <Button auto color="foreground" light>
            bottomStart
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={4} justify="center">
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="bottom"
        >
          <Button auto color="foreground" light>
            bottom
          </Button>
        </Tooltip>
      </Grid>
      <Grid xs={4}>
        <Tooltip
          color="primary"
          content="Developers love Next.js"
          placement="bottomEnd"
        >
          <Button auto color="foreground" light>
            bottomEnd
          </Button>
        </Tooltip>
      </Grid>
    </Grid.Container>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
