
const DeleteUser = `import React from "react";
import { useTheme, Text, Button, Grid, Row } from "@nextui-org/react";

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
          Are you sure you want to delete this user ?, by doing this, you will
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
};

`;

const UserTwitterCard = `import React from "react";
import {Avatar,Row,Col,Text,Button,Spacer,Grid} from "@nextui-org/react";

export const UserTwitterCard = ({
  avatarUrl,
  avatarProps,
  css,
  onClick,
  ...props
}) => {
  const [following, setFollowing] = React.useState(false);

  return (
    <Grid.Container
      className="user-twitter-card__container"
      css={{
        mw: "250px",
        borderRadius: "$lg",
        padding: "$sm",
        ...css
      }}
      onClick={onClick}
      {...props}
    >
      <Row justify="space-between" align="center">
        <Col span={3}>
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            color="gradient"
            bordered
            squared
            {...avatarProps}
          />
        </Col>
        <Col span={9}>
          <Row>
            <Grid xs={12} direction="column">
              <Text className="user-twitter-card__text" b size={15}>
                Zoey Lang
              </Text>
              <Text
                className="user-twitter-card__text"
                size={14}
                css={{ mt: "-$3" }}
                color="#888888"
              >
                @zoeylang
              </Text>
            </Grid>
            <Button
              auto
              rounded
              onClick={() => setFollowing(!following)}
              css={{
                maxHeight: "$space$12",
                fs: "$tiny",
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
          &nbsp;Following
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
          &nbsp;Followers
        </Text>
      </Grid.Container>
    </Grid.Container>
  );
};
`;



const AppJs = `import { Tooltip, Button, Grid, Avatar } from "@nextui-org/react";
import { UserTwitterCard } from "./UserTwitterCard";
import { DeleteUser } from "./DeleteUser";

export default function App() {
  return (
    <Grid.Container gap={2} alignItems="center">
      <Grid>
        <Tooltip trigger="click" content={<DeleteUser />}>
          <Button color="error" auto flat>
            Click Delete User
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip placement="top" content={<UserTwitterCard />}>
          <Avatar
            pointer
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            color="gradient"
            bordered
            squared
          />
        </Tooltip>
      </Grid>
    </Grid.Container>
  );
}

`;

const react = {
  '/UserTwitterCard.js': UserTwitterCard,
  '/DeleteUser.js': DeleteUser,
  '/App.js': AppJs
};


export default {
  ...react,
};
