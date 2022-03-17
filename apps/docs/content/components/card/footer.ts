const App = `import { Card,Grid,Text,Link } from '@nextui-org/react';
    
export default function App() {
  return <Grid.Container gap={2}>
  <Grid sm={12} md={5}>
    <Card css={{ mw: "330px" }}>
      <Text h4>Next UI</Text>
      <Text>🚀  Beautiful and modern React UI library.</Text>
      <Card.Footer>
        <Link color="primary" target="_blank" href="https://github.com/nextui-org/nextui">
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
  </Grid>
  <Grid sm={12} md={5}>
      <Card css={{ mw: "330px" }} color="primary">
        <Text h4 color="white">Next UI</Text>
        <Text color="white">🚀  Beautiful and modern React UI library.</Text>
        <Card.Footer>
          <Link target="_blank" css={{ color: "white" }} href="https://github.com/nextui-org/nextui">
            Visit source code on GitHub.
          </Link>
        </Card.Footer>
      </Card>
  </Grid>
</Grid.Container>
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
