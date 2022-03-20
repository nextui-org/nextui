const App = `import { Container, Card, Row, Text, Col } from "@nextui-org/react";

export default function App() {
  return (
    <Container gap={0}>
    <Row gap={1}>
      <Col>
          <Card color="primary">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              1 of 2
            </Text>
          </Card>
      </Col>
      <Col>
          <Card color="primary">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              2 of 2
            </Text>
          </Card>
      </Col>
    </Row>
    <Spacer y={1}/>
    <Row gap={1}>
      <Col>
          <Card color="primary">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              1 of 3
            </Text>
          </Card>
      </Col>
      <Col>
          <Card color="primary">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              2 of 3
            </Text>
          </Card>
      </Col>
      <Col>
          <Card color="primary">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              3 of 3
            </Text>
          </Card>
      </Col>
    </Row>
  </Container>
  );
}`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
