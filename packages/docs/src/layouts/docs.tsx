import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { Container, Row, Col, useTheme, NextUIThemes } from '@nextui-org/react';
import NextLink from 'next/link';
import { Route } from '@lib/docs/page';
import { Sidebar, TableOfContent } from '@components';
import { Link } from '@nextui-org/react';
import { Heading, getHeadings } from '@utils/get-headings';
import { MetaProps } from '@lib/docs/meta';
import Header from '@layouts/header';
import { Sticky, PageNav } from '@components';
import { REPO_NAME, GITHUB_URL } from '@lib/github/constants';
import { TAG, CONTENT_PATH } from '@lib/docs/config';

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  prevRoute?: Route;
  nextRoute?: Route;
  meta?: MetaProps;
  tag?: string;
  slug?: string;
}

const DocsLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  routes,
  prevRoute,
  nextRoute,
  currentRoute,
  tag,
  slug,
  meta,
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [scrollPosition, setScrollPosition] = useState(
    (typeof window !== 'undefined' && window.pageYOffset) || 0
  );
  const theme = useTheme() as NextUIThemes;

  useEffect(() => {
    window.addEventListener('scroll', onScroll.bind(this));
    return () => {
      window.removeEventListener('scroll', onScroll.bind(this));
    };
  }, []);

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset);
    });
  };

  useEffect(() => {
    setHeadings(getHeadings());
  }, [routes]);

  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;

  return (
    <Container lg as="main" className="docs__container" display="flex" gap={0}>
      <Header {...meta} />
      <Navbar routes={routes} detached={scrollPosition > 0} />
      <Row className="docs__content" gap={0}>
        <Sticky offset={10} className="docs__left-sidebar">
          <Sidebar routes={routes} tag={tag} slug={slug} />
        </Sticky>
        <Col className="docs__center">
          {children}
          <PageNav tag={tag} prevRoute={prevRoute} nextRoute={nextRoute} />
          <footer>
            {tag ? (
              <NextLink href={slug || ''}>
                <Link>
                  <small>Go to the live version of this page</small>
                </Link>
              </NextLink>
            ) : (
              <a href={editUrl} target="_blank" rel="noopener noreferrer">
                <small>Edit this page on GitHub</small>
              </a>
            )}
          </footer>
        </Col>
        <Sticky offset={10} className="docs__right-sidebar">
          <TableOfContent headings={headings} />
        </Sticky>
        <img
          className="docs__gradient-blue"
          src="/gradient-blue.svg"
          alt="gradient blue background"
        />
        <img
          className="docs__gradient-violet"
          src="/gradient-violet.svg"
          alt="gradient violet background"
        />
      </Row>
      <Footer />
      <style jsx>
        {`
          :global(.docs__container) {
            position: relative;
          }
          :global(.docs__left-sidebar) {
            width: 20%;
            max-height: calc(100vh - 4rem);
            overflow: auto;
            display: none;
          }
          :global(.docs__center) {
            z-index: 99;
            padding: 0 1.4rem !important;
          }
          :global(.docs__left-sidebar::-webkit-scrollbar) {
            width: 0px;
          }
          :global(.docs__content) {
            padding-top: 1rem;
          }
          :global(.docs__right-sidebar, .docs__left-sidebar) {
            display: none;
            width: 24%;
          }
          :global(.docs__gradient-blue, .docs__gradient-violet) {
            top: 0;
            opacity: 0;
            position: fixed;
            animation: appear 200ms 100ms ease forwards;
          }
          :global(.docs__gradient-blue) {
            top: 10%;
            left: -10%;
            z-index: 1;
          }
          :global(.docs__gradient-violet) {
            display: block;
            z-index: 1;
            top: -50%;
            right: -50%;
          }
          @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
            :global(.docs__content) {
              margin-top: 64px;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
              padding: 0;
            }
          }
          @media only screen and (min-width: ${theme.breakpoints.sm.max}) {
            :global(.docs__left-sidebar) {
              display: block;
            }
          }
          @media only screen and (max-width: ${theme.breakpoints.md.min}) {
            :global(.docs__center) {
              padding: 0 1rem !important;
            }
            :global(.docs__gradient-violet) {
              top: -35%;
              right: -45%;
            }
          }
          @media only screen and (max-width: ${theme.breakpoints.lg.min}) {
            :global(.docs__content) {
              padding: 0 20px;
            }
          }
          @media only screen and (min-width: ${theme.breakpoints.lg.min}) {
            :global(.docs__right-sidebar) {
              display: block;
            }
            :global(.docs__right-sidebar, .docs__gradient-violet) {
              top: -50%;
              right: -50%;
            }
          }
          @keyframes appear {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default DocsLayout;
