import React from 'react';
import { Logo } from '@components';
import cn from 'classnames';
import NextLink from 'next/link';
import {
  Container,
  Row,
  Col,
  Spacer,
  Link,
  Text,
  useTheme,
} from '@nextui-org/react';
import { useRouter } from 'next/router';

const isActive = (pathname: string, href: string) =>
  pathname && pathname.startsWith(href);

const Navbar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Container
      className="navbar__container"
      display="flex"
      alignItems="center"
      as="nav"
      gap={0}
    >
      <Row justify="space-between" align="center">
        <Col>
          <NextLink href="/">
            <Link>
              <Logo className="navbar__logo" />
            </Link>
          </NextLink>
        </Col>
        <Col>
          <Row justify="center" align="center">
            <Spacer x={1} y={0} />
            <NextLink href="/docs/guide/getting-started">
              <Link
                className={cn('navbar__link', {
                  active: isActive(router.pathname, '/docs/[[...slug]]'),
                })}
                href="#"
              >
                Docs
              </Link>
            </NextLink>
            <Spacer x={1} y={0} />
            <NextLink href="#">
              <Link href="#">Ecosystem</Link>
            </NextLink>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Text>Search</Text>
          </Row>
        </Col>
      </Row>
      <style jsx>{`
        :global(.navbar__container) {
          min-height: 80px;
          max-height: 80px;
          z-index: 99;
        }
        :global(.navbar__logo) {
          cursor: pointer;
        }
        :global(.navbar__link.active) {
          font-weight: 600;
          color: ${theme.palette.primary};
        }
      `}</style>
    </Container>
  );
};

export default Navbar;
