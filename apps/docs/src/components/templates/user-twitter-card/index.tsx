import React, {useState} from "react";
import {
  useTheme,
  Avatar,
  AvatarProps,
  Row,
  Col,
  Text,
  Button,
  Spacer,
  Grid,
  CSS,
} from "@nextui-org/react";
import withDefaults from "@utils/with-defaults";

interface Props {
  avatarUrl?: string;
  avatarProps?: AvatarProps;
  onClick?: () => void;
}

const defaultProps = {
  avatarUrl: "/avatars/avatar-2.png",
};

export type UserTwitterCardProps = Props & {css?: CSS};

const UserTwitterCard: React.FC<UserTwitterCardProps> = ({
  avatarUrl,
  avatarProps,
  css,
  onClick,
  ...props
}) => {
  const {theme} = useTheme();
  const [following, setFollowing] = useState(false);

  return (
    <Grid.Container
      className="user-twitter-card__container"
      css={{
        mw: "250px",
        borderRadius: "$lg",
        padding: "$sm",
        ...css,
      }}
      onClick={onClick}
      {...props}
    >
      <Row align="center" justify="space-between">
        <Col span={3}>
          <Avatar bordered squared color="gradient" size="lg" src={avatarUrl} {...avatarProps} />
        </Col>
        <Col span={9}>
          <Row>
            <Grid direction="column" xs={12}>
              <Text b className="user-twitter-card__text" size={15}>
                Zoey Lang
              </Text>
              <Text
                className="user-twitter-card__text"
                color={theme?.colors?.accents7?.value}
                css={{mt: "-$3"}}
                size={14}
              >
                @zoeylang
              </Text>
            </Grid>
            <Button
              auto
              rounded
              bordered={following}
              color="primary"
              css={{
                maxHeight: "$space$12",
                fs: "$xs",
                fontWeight: "$semibold",
                borderColor: following ? "$foreground" : "$primary",
                color: following ? "$foreground" : "$white",
              }}
              onClick={() => setFollowing(!following)}
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
            color={theme?.colors?.accents6?.value}
            css={{mt: "$1"}}
            size={14}
          >
            Full-stack developer, @getnextui lover she/her 🎉
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container
        alignContent="center"
        className="user-twitter-card__metrics-container"
        justify="flex-start"
      >
        <Text className="user-twitter-card__text" color={theme?.colors?.accents7?.value} size={14}>
          <Text b className="user-twitter-card__text" color="foreground" size={14}>
            4
          </Text>
          &nbsp;Following
        </Text>
        <Spacer inline x={0.5} />
        <Text className="user-twitter-card__text" color={theme?.colors?.accents7?.value} size={14}>
          <Text b className="user-twitter-card__text" color="foreground" size={14}>
            97.1K
          </Text>
          &nbsp;Followers
        </Text>
      </Grid.Container>
    </Grid.Container>
  );
};

export default withDefaults(UserTwitterCard, defaultProps);
