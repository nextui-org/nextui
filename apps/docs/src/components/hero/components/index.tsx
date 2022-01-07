import React from 'react';
import {
  Input,
  Card,
  Row,
  Col,
  Loading,
  Text,
  Switch,
  styled,
  Grid,
  useTheme,
  Pagination,
  Tooltip,
  Button
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { levitating } from '@utils/animations';
import { Logo, Moon, Sun, UserTwitterCard } from '@components';
import { useTheme as useNextTheme } from 'next-themes';

const StyledContainer = styled('div', {
  dflex: 'center',
  position: 'absolute',
  zIndex: '$2'
});

const HeroComponents = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const router = useRouter();

  const handleToggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <StyledContainer>
      <Input
        bordered
        clearable
        labelPlaceholder="Input"
        color="secondary"
        initialValue="NetxUI"
        css={{
          position: 'absolute',
          top: '-200px',
          right: '-100px',
          $$inputBorderColor: '$colors$secondary',
          animation: `${levitating} 10s ease infinite`
        }}
      />
      <Switch
        initialChecked
        size="xl"
        iconOn={<Moon filled />}
        iconOff={<Sun filled />}
        onChange={handleToggleTheme}
        css={{
          position: 'absolute',
          top: '-170%',
          right: '-120%',
          animation: `${levitating} 13s ease infinite 1s reverse`
        }}
      />
      <UserTwitterCard
        avatarUrl="/avatars/avatar-3.png"
        avatarProps={{
          squared: false,
          color: 'default',
          css: {
            '.nextui-avatar-img': {
              borderColor: '#FF1CF7'
            }
          }
        }}
        css={{
          position: 'relative',
          cursor: 'pointer',
          top: '-120px',
          left: '100px',
          px: '$8',
          mw: '280px',
          animation: `${levitating} 12s ease infinite`,
          backgroundColor: isDark ? '$accents1' : '$background',
          boxShadow: '$sm'
        }}
      />
      <Grid
        css={{
          position: 'absolute',
          bottom: '-20px',
          left: '200px',
          animation: `${levitating} 14s ease infinite`
        }}
      >
        <Tooltip
          keepMounted
          initialVisible
          content={'Developers love Next.js'}
          offset={50}
          color="secondary"
          trigger="click"
          css={{
            animation: `${levitating} 14s ease infinite 0.1s`,
            marginLeft: '-90px',
            transform: 'translate(0, 0)'
          }}
        >
          <Button auto bordered color="primary" size="sm">
            Tooltip
          </Button>
        </Tooltip>
      </Grid>
      <Card
        css={{
          p: 0,
          w: '120px',
          h: '120px',
          position: 'absolute',
          right: '-240px',
          top: '-300px',
          animation: `${levitating} 13s ease infinite 1s`
        }}
      >
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: -5 }}>
          <Col>
            <Text
              size={10}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              New
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src="/images/card-example-6.jpeg"
            height={400}
            width="100%"
            alt="Card example background"
            css={{
              width: '100%',
              transform: 'translateY(-30%)',
              height: '150%'
            }}
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: 'absolute',
            bgBlur: '#666666',
            maxHeight: '$space$12',
            px: '$6',
            borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
            bottom: 0,
            zIndex: 1
          }}
        >
          <Row justify="space-between">
            <Text
              color="#fff"
              size={12}
              css={{
                fontWeight: '$semibold',
                textShadow: '0 2px 2px rgba(0,0,0,0.3)'
              }}
            >
              Camera
            </Text>
            <Text
              color="#fff"
              size={12}
              css={{
                fontWeight: '$semibold',
                textShadow: '0 2px 2px rgba(0,0,0,0.3)'
              }}
            >
              $525
            </Text>
          </Row>
        </Card.Footer>
      </Card>
      <Button.Group
        size="sm"
        color="gradient"
        bordered
        css={{
          position: 'absolute',
          top: '-160px',
          left: '180%',
          animation: `${levitating} 16s ease infinite`
        }}
      >
        <Button>Fast</Button>
        <Button>Modern</Button>
        <Button>Unique</Button>
      </Button.Group>
      <Grid
        css={{
          position: 'absolute',
          size: '100px',
          cursor: 'pointer',
          top: '-110px',
          right: '-220px',
          dflex: 'center',
          animation: `${levitating} 18s ease infinite`,
          background: '$accents1',
          boxShadow: '$sm',
          borderRadius: '$lg'
        }}
        onClick={() => {
          router.push('/docs/guide/getting-started');
        }}
      >
        <Logo small size={60} />
      </Grid>
      <Pagination
        noMargin
        shadow
        rounded
        size="md"
        total={10}
        initialPage={6}
        css={{
          position: 'absolute',
          top: '-80px',
          right: '-190%',
          animation: `${levitating} 20s ease infinite 2s`
        }}
      />
      <Grid
        css={{
          position: 'absolute',
          zIndex: '$3',
          size: '80px',
          top: '-20px',
          right: '-120%',
          display: 'flex',
          animation: `${levitating} 23s ease infinite`,
          justifyContent: 'center',
          alignItems: 'center',
          background: '$accents1',
          boxShadow: '$sm',
          borderRadius: '$lg'
        }}
      >
        <Loading size="lg" />
      </Grid>
      <Card
        cover
        css={{
          p: 0,
          w: '200px',
          h: '200px',
          zIndex: '$2',
          position: 'absolute',
          right: '-95%',
          top: '40px',
          animation: `${levitating} 18s ease infinite 1s`
        }}
      >
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src="/images/hero-card.png"
            height={400}
            width="100%"
            alt="Hero Card background"
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: 'absolute',
            bgBlur: '#808080',
            height: '$space$14',
            px: '$6',
            py: '$1',
            borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
            bottom: 0,
            zIndex: 1
          }}
        >
          <Row align="center">
            <Col>
              <Text
                color="#fff"
                size={12}
                css={{ textShadow: '0 2px 2px rgba(0,0,0,0.3)' }}
              >
                Available soon.
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end" align="center">
                <Button
                  auto
                  rounded
                  color="secondary"
                  css={{ px: '$4', height: '$space$10' }}
                >
                  <Text
                    css={{ color: 'inherit' }}
                    size={10}
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
    </StyledContainer>
  );
};

export default HeroComponents;
