const App = `import { Grid, Card, Text } from "@nextui-org/react";

export default function App() {
  const MockItem = ({ text }) => {
    return (
      <Card color="primary" css={{ h: "$24" }}>
        <Text h6 size={15} color="white" css={{ mt: 0 }}>
          {text}
        </Text>
      </Card>
    );
  };  
  return (
    <Grid.Container gap={2} justify="center">
    <Grid xs={4}>
      <MockItem text="1 of 3" />
    </Grid>
    <Grid xs={4}>
      <MockItem text="2 of 3" />
    </Grid>
    <Grid xs={4}>
      <MockItem text="3 of 3" />
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
