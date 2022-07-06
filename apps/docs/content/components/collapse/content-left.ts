const App = `import { Collapse, Text, Grid, Avatar, Link } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Collapse.Group shadow>
          <Collapse
            title={<Text h4>Chung Miller</Text>}
            subtitle="4 unread messages"
            contentLeft={
              <Avatar
                size="lg"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                color="secondary"
                bordered
                squared
              />
            }
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
          <Collapse
            title={<Text h4>Janelle Lenard</Text>}
            subtitle="3 incompleted steps"
            contentLeft={
              <Avatar
                size="lg"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                color="success"
                bordered
                squared
              />
            }
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
          <Collapse
            title={<Text h4>Zoey Lang</Text>}
            subtitle={
              <Text>
                2 issues to <Link color>fix now</Link>
              </Text>
            }
            contentLeft={
              <Avatar
                size="lg"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                color="error"
                bordered
                squared
              />
            }
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
