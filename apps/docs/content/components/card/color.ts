const App = `import { Card, Grid, Text } from "@nextui-org/react";

export default function App() {
  const colors = [
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "gradient",
  ];
  return (
    <Grid.Container gap={2}>
      {colors.map((color) => (
        <Grid xs={12} md={4} key={color}>
          <Card color={color}>
            <Text
              css={{ fontWeight: "$bold", color: "$white" }}
              transform="capitalize"
            >
              {color}
            </Text>
            <Text css={{ fontWeight: "$bold", color: "$white" }} span>
              {color}
            </Text>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
