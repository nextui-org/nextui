const App = `import { Card, Grid, Col, Text, Row, Button } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2} justify="center">
      {/* Card 1 */}
      <Grid xs={12} sm={4}>
        <Card cover>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                What to watch
              </Text>
              <Text h4 color="white">
                Stream the Acme event
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            src="/images/card-example-4.jpeg"
            height={340}
            width="100%"
            alt="Card image background"
          />
        </Card>
      </Grid>
      {/* Card 2 */}
      <Grid xs={12} sm={4}>
        <Card width="100%" cover>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                Plant a tree
              </Text>
              <Text h4 color="white">
                Contribute to the planet
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            src="/images/card-example-3.jpeg"
            height={340}
            width="100%"
            alt="Card image background"
          />
        </Card>
      </Grid>
      {/* Card 3 */}
      <Grid xs={12} sm={4}>
        <Card cover css={{ bg: "$black", w: "100%" }}>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                Supercharged
              </Text>
              <Text h4 color="white">
                Creates beauty like a beast
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            src="/images/card-example-2.jpeg"
            height={340}
            width="100%"
            alt="Card image background"
          />
        </Card>
      </Grid>
      {/* Card 4 */}
      <Grid xs={12} sm={5}>
        <Card cover css={{ w: "100%" }}>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                New
              </Text>
              <Text h3 color="black">
                Acme camera
              </Text>
            </Col>
          </Card.Header>
          <Card.Body>
            <Card.Image
              src="/images/card-example-6.jpeg"
              height={400}
              width="100%"
              alt="Card example background"
            />
          </Card.Body>
          <Card.Footer
            blur
            css={{
              position: "absolute",
              bgBlur: "#ffffff",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Row>
              <Col>
                <Text color="#000" size={12}>
                  Available soon.
                </Text>
                <Text color="#000" size={12}>
                  Get notified.
                </Text>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button flat auto rounded color="secondary">
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Notify Me
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      {/* Card 5 */}
      <Grid xs={12} sm={7}>
        <Card cover css={{ w: "100%", p: 0 }}>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#9E9E9E"
              >
                Your day your way
              </Text>
              <Text h3 color="white">
                Your checklist for better sleep
              </Text>
            </Col>
          </Card.Header>
          <Card.Body>
            <Card.Image
              src="/images/card-example-5.jpeg"
              height={400}
              width="100%"
              alt="Relaxing app background"
            />
          </Card.Body>
          <Card.Footer
            blur
            css={{
              position: "absolute",
              bgBlur: "#0f1114",
              borderTop: "$borderWeights$light solid $gray700",
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Row>
              <Col>
                <Row>
                  <Col span={3}>
                    <Card.Image
                      src="/images/breathing-app-icon.jpeg"
                      css={{ background: "black" }}
                      height={40}
                      width={40}
                      alt="Breathing app icon"
                    />
                  </Col>
                  <Col>
                    <Text color="#d1d1d1" size={12}>
                      Breathing App
                    </Text>
                    <Text color="#d1d1d1" size={12}>
                      Get a good night's sleep.
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button
                    flat
                    auto
                    rounded
                    css={{ color: "#94f9f0", bg: "#94f9f026" }}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Get App
                    </Text>
                  </Button>
                </Row>
              </Col>
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
