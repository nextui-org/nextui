const App = `import React from 'react';
import { Popover, Button, Text, Grid } from "@nextui-org/react";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Grid.Container gap={2} alignContent="center">
      <Grid>
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger>
            <Button auto flat color="secondary">Open Popover (controlled)</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Text css={{ p: "$10" }}>This is the content of the popover.</Text>
          </Popover.Content>
        </Popover>
      </Grid>
      <Grid>
        <Popover>
          <Popover.Trigger>
            <Button auto flat>Open Popover (uncontrolled)</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Text css={{ p: "$10" }}>This is the content of the popover.</Text>
          </Popover.Content>
        </Popover>
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
