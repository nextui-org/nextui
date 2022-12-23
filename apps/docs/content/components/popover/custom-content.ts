const DeleteUser = `import React from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

export const DeleteUser = () => {
  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text>
          Are you sure you want to delete this user ? By doing this, you will
          not be able to recover the data.
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" light>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error">
            Delete
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};`;

const UserTwitterCard = `import React from "react";
import { User, Row, Col, Text, Button, Spacer, Grid } from "@nextui-org/react";

export const UserTwitterCard = () => {
  const [following, setFollowing] = React.useState(false);

  return (
    <Grid.Container
      className="user-twitter-card__container"
      css={{
        mw: "270px",
        borderRadius: "$lg",
        padding: "$sm",
      }}
    >
      <Row justify="space-around" align="center">
        <Col span={8}>
          <User
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            name="Ariana Wattson"
            description="UI/UX Designer"
            css={{ px: 0 }}
          />
        </Col>
        <Col span={4}>
          <Row>
            <Button
              auto
              rounded
              onPress={() => setFollowing(!following)}
              css={{
                maxHeight: "$space$12",
                fs: "$xs",
                fontWeight: "$semibold",
                borderColor: following ? "$foreground" : "$primary",
                color: following ? "$foreground" : "$white"
              }}
              color="primary"
              bordered={following}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          </Row>
        </Col>
      </Row>
      <Grid.Container className="user-twitter-card__username-container">
        <Grid xs={12}>
          <Text
            className="user-twitter-card__text"
            size={14}
            css={{ mt: "$1" }}
            color="#888888"
          >
            Full-stack developer, @getnextui lover she/her 🎉
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container
        className="user-twitter-card__metrics-container"
        justify="flex-start"
        alignContent="center"
      >
        <Text className="user-twitter-card__text" size={14} color="#888888">
          <Text
            b
            color="foreground"
            className="user-twitter-card__text"
            size={14}
          >
            4
          </Text>
           Following
        </Text>
        <Spacer inline x={0.5} />
        <Text className="user-twitter-card__text" size={14} color="#888888">
          <Text
            b
            color="foreground"
            className="user-twitter-card__text"
            size={14}
          >
            97.1K
          </Text>
           Followers
        </Text>
      </Grid.Container>
    </Grid.Container>
  );
};`;

const App = `import { Popover, User, Button, Grid } from "@nextui-org/react";
import { UserTwitterCard } from "./UserTwitterCard";
import { DeleteUser } from "./DeleteUser";

export default function App() {
  return (
    <Grid.Container gap={2} alignContent="center">
      <Grid>
        <Popover>
          <Popover.Trigger>
            <Button color="error" auto flat>Delete user</Button>
          </Popover.Trigger>
          <Popover.Content>
            <DeleteUser />
          </Popover.Content>
        </Popover>
      </Grid>
      <Grid>
        <Popover >
          <Popover.Trigger>
            <User
              as="button"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name="Ariana Wattson"
              description="UI/UX Designer"
            />
          </Popover.Trigger>
          <Popover.Content css={{ px: '$4', py: '$2' }}>
            <UserTwitterCard />
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  "/UserTwitterCard.js": UserTwitterCard,
  "/DeleteUser.js": DeleteUser,
  "/App.js": App,
};

export default {
  ...react,
};
