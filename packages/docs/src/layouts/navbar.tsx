import React, { useState } from 'react';
import { Logo, SearchInput, MenuToggle } from '@components';
import cn from 'classnames';
import NextLink from 'next/link';
import { Container, Row, Col, Spacer, Link, useTheme } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@hooks/use-media-query';
import { addColorAlpha } from '@utils/index';

export interface Props {
  isHome?: boolean;
  detached?: boolean;
}

const isActive = (pathname: string, href: string) =>
  pathname && pathname.startsWith(href);

const Navbar: React.FC<Props> = ({ isHome, detached }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(960);

  const onToggleNavigation = () => setExpanded(!expanded);

  return (
    <nav className="navbar__container">
      <div className="navbar__wrapper">
        <Col className="navbar__logo-container">
          <NextLink href="/">
            <Link>
              <Logo auto className="navbar__logo" />
            </Link>
          </NextLink>
        </Col>
        <Col className="navbar__resources-container">
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
        <Col className="navbar__search-container">
          <Row
            className="navbar__search-row"
            justify={isMobile ? 'center' : 'flex-end'}
            align="center"
          >
            <SearchInput />
          </Row>
        </Col>
        <Col className="navbar__menu-container">
          <div
            className="navbar__menu-arrow noselect"
            onClick={onToggleNavigation}
          >
            <MenuToggle expanded={expanded} />
          </div>
        </Col>
      </div>
      <style jsx>{`
        .navbar__container,
        .navbar__wrapper {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .navbar__container {
          min-height: 64px;
          max-height: 64px;
          z-index: 9999;
        }
        .navbar__wrapper {
          padding: 0 16px;
        }
        :global(.navbar__search-row) {
          position: initial !important;
        }
        :global(.navbar__logo) {
          cursor: pointer;
        }
        :global(.navbar__link.active) {
          font-weight: 600;
          color: ${theme.palette.primary};
        }
        :global(.navbar__menu-arrow) {
          height: 40px;
          width: 40px;
          float: right;
        }
        :global(.navbar__menu-container) {
          display: none;
        }
        @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
          :global(.navbar__container) {
            top: 0;
            position: fixed;
            background: ${isHome || !detached
              ? 'transparent'
              : addColorAlpha(theme.palette.background, 0.6)};
            box-shadow: ${detached
              ? '0px 5px 20px -5px rgba(2, 1, 1, 0.1)'
              : 'none'};
            min-height: 64px;
            max-height: 64px;
          }
          @supports (
            (-webkit-backdrop-filter: blur(10px)) or
              (backdrop-filter: blur(10px))
          ) {
            :global(.navbar__container) {
              backdrop-filter: ${isHome || !detached
                ? 'none'
                : 'saturate(180%) blur(10px)'};
            }
          }
        }
        @media only screen and (max-width: ${theme.breakpoints.md.min}) {
          :global(.navbar__logo-container) {
            display: flex;
            width: 24px;
            align-items: center;
          }
          :global(.navbar__menu-container) {
            display: block;
          }

          :global(.navbar__resources-container) {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
