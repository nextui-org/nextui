const App = `import { Textarea, Grid, useInput, Spacer, Button } from "@nextui-org/react";
import React from "react";

export default function App() {
  // Controlled
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput("Controlled Textarea");
  React.useEffect(() => console.log({ controlledValue }), [controlledValue]);
  // Uncontrolled
  const textareaRef = React.useRef(null);
  const onClick = () => {
    if (textareaRef.current) {
      textareaRef.current.value = Math.random().toString(32);
    }
  };
  return (
    <>
      <Grid.Container gap={1}>
        <Grid>
          <Textarea {...bindings} />
          <Spacer y={0.5} />
          <Grid.Container gap={0.5}>
            <Grid>
              <Button
                auto
                color="primary"
                size="sm"
                onClick={() => setControlledValue(Math.random().toString(32))}
              >
                Set value
              </Button>
            </Grid>
            <Grid>
              <Button auto flat size="sm" onClick={() => reset()}>
                Reset value
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
        <Spacer x={2} />
        <Grid>
          <Textarea
            ref={textareaRef}
            initialValue="Uncontrolled Textarea"
            onChange={(e) => console.log(e.target.value)}
          />
          <Spacer y={0.5} />
          <Grid.Container gap={0.5}>
            <Grid>
              <Button auto color="secondary" size="sm" onClick={onClick}>
                Set value
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </>
  );
}

`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
