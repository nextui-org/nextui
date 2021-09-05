import React, { useState } from 'react';
import {
  useTheme,
  Avatar,
  Row,
  Text,
  Button,
  Spacer,
  Grid,
  NextUIThemes,
} from '@nextui-org/react';

const UserTwitterCard: React.FC = () => {
  const theme = useTheme() as NextUIThemes;
  const [following, setFollowing] = useState(false);

  return (
    <Grid.Container className="user-twitter-card__container">
      <Row justify="space-between">
        <Avatar
          size="large"
          src="/avatars/avatar-2.png"
          color="gradient"
          bordered
          squared
        />
        <Button
          auto
          onClick={() => setFollowing(!following)}
          color={following ? 'foreground' : 'primary'}
          rounded
          bordered={following}
        >
          {following ? 'Unfollow' : 'Follow'}
        </Button>
      </Row>
      <Grid.Container className="user-twitter-card__username-container">
        <Grid xs={12}>
          <Text className="user-twitter-card__text" b size={15}>
            Zoey Lang
          </Text>
        </Grid>
        <Grid xs={12}>
          <Text
            className="user-twitter-card__text"
            size={14}
            color={theme.palette.accents_5}
          >
            @zoeylang
          </Text>
        </Grid>
        <Grid xs={12}>
          <Text
            className="user-twitter-card__text"
            size={14}
            color={theme.palette.accents_5}
          >
            @getnextui Lover
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container
        className="user-twitter-card__metrics-container"
        justify="flex-start"
        alignContent="center"
      >
        <Text
          className="user-twitter-card__text"
          size={14}
          color={theme.palette.accents_5}
        >
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
        <Text
          className="user-twitter-card__text"
          size={14}
          color={theme.palette.accents_5}
        >
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
      <style jsx>
        {`
          :global(.user-twitter-card__container) {
            max-width: 250px;
            border-radius: ${theme.layout.radius};
            padding: ${theme.layout.gapHalf};
          }
          :global(.user-twitter-card__username-container) {
            padding: 4px 0;
          }
          :global(.user-twitter-card__text) {
            margin: 0;
          }
          :global(.user-twitter-card__metrics-container) {
            padding: 6px 0;
          }
        `}
      </style>
    </Grid.Container>
  );
};

const MemoUserTwitterCard: React.FC = React.memo(UserTwitterCard);

export default MemoUserTwitterCard;
