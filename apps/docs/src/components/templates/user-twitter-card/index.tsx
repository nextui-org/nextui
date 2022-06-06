import React, { useState } from 'react';
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
  CSS
} from '@nextui-org/react';
import withDefaults from '@utils/with-defaults';

interface Props {
  avatarUrl?: string;
  avatarProps?: AvatarProps;
  onClick?: () => void;
}

const defaultProps = {
  avatarUrl: '/avatars/avatar-2.png'
};

export type UserTwitterCardProps = Props & { css?: CSS };

const UserTwitterCard: React.FC<UserTwitterCardProps> = ({
  avatarUrl,
  avatarProps,
  css,
  onClick,
  ...props
}) => {
  const { theme } = useTheme();
  const [following, setFollowing] = useState(false);

  return (
    <Grid.Container
      className="user-twitter-card__container"
      css={{
        mw: '250px',
        borderRadius: '$lg',
        padding: '$sm',
        ...(css as any)
      }}
      onClick={onClick}
      {...props}
    >
      <Row justify="space-between" align="center">
        <Col span={3}>
          <Avatar
            size="lg"
            src={avatarUrl}
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
                css={{ mt: '-$3' }}
                color={theme?.colors?.accents7?.value}
              >
                @zoeylang
              </Text>
            </Grid>
            <Button
              auto
              rounded
              onClick={() => setFollowing(!following)}
              css={{
                maxHeight: '$space$12',
                fs: '$xs',
                fontWeight: '$semibold',
                borderColor: following ? '$foreground' : '$primary',
                color: following ? '$foreground' : '$white'
              }}
              color="primary"
              bordered={following}
            >
              {following ? 'Unfollow' : 'Follow'}
            </Button>
          </Row>
        </Col>
      </Row>
      <Grid.Container className="user-twitter-card__username-container">
        <Grid xs={12}>
          <Text
            className="user-twitter-card__text"
            size={14}
            css={{ mt: '$1' }}
            color={theme?.colors?.accents6?.value}
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
        <Text
          className="user-twitter-card__text"
          size={14}
          color={theme?.colors?.accents7?.value}
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
          color={theme?.colors?.accents7?.value}
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
    </Grid.Container>
  );
};

export default withDefaults(UserTwitterCard, defaultProps);
