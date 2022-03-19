const App = `import { Card, Grid, Text, Divider, Button, Row } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid sm={12} md={5}>
        <Card css={{ mw: "330px" }}>
          <Card.Header>
            <Text b>Card Title</Text>
          </Card.Header>
          <Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Text>
          </Card.Body>
          <Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm" light>
                Cancel
              </Button>
              <Button size="sm">Agree</Button>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      <Grid sm={12} md={5}>
        <Card css={{ mw: "330px" }}>
          <Card.Header>
            <Text b>Card Title</Text>
          </Card.Header>
          <Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Text>
          </Card.Body>
          <Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm" light>
                Share
              </Button>
              <Button size="sm" color="secondary">
                Learn more
              </Button>
            </Row>
          </Card.Footer>
        </Card>
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
