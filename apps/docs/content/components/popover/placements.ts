const AppTs = `import { Popover, Button, Grid, PopoverPlacement } from "@nextui-org/react";

export default function App() {
  const placements = [
    "bottom",
    "top",
    "left",
    "right",
    "bottom-left",
    "bottom-right",
    "top-left",
    "top-right",
    "left-top",
    "left-bottom",
    "right-top",
    "right-bottom",
  ];

  return (
    <Grid.Container gap={2} justify="center" alignContent="center">
      {placements.map((placement: PopoverPlacement) => (
        <Grid key={placement}>
          <Popover placement={placement}>
            <Popover.Trigger>
              <Button auto>{placement}</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text css={{ p: "$10" }}>
                This is the content of the popover.
              </Text>
            </Popover.Content>
          </Popover>
        </Grid>
      ))}
    </Grid.Container>
  );
}`;

const AppJs = `import { Popover, Button, Grid } from "@nextui-org/react";

export default function App() {
  const placements = [
    "bottom",
    "top",
    "left",
    "right",
    "bottom-left",
    "bottom-right",
    "top-left",
    "top-right",
    "left-top",
    "left-bottom",
    "right-top",
    "right-bottom",
  ];

  return (
    <Grid.Container gap={2} justify="center" alignContent="center">
      {placements.map((placement) => (
        <Grid key={placement}>
          <Popover placement={placement}>
            <Popover.Trigger>
              <Button auto color="secondary" ghost>{placement}</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text css={{ p: "$10" }}>
                This is the content of the popover.
              </Text>
            </Popover.Content>
          </Popover>
        </Grid>
      ))}
    </Grid.Container>
  );
}`;

const react = {
  '/App.js': AppJs
};

const reactTs = {
  '/App.tsx': AppTs
};

export default {
  ...react,
  ...reactTs
};
