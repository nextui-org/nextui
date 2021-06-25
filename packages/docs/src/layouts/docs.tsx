import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import {
  Container,
  Row,
  Col,
  Spacer,
  useTheme,
  NextUIThemes,
} from '@nextui-org/react';
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
import { useMediaQuery } from '@hooks/use-media-query';

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
  const theme = useTheme() as NextUIThemes;
  const isMobile = useMediaQuery(
    Number(theme.breakpoints.sm.min.replace('px', ''))
  );
  useEffect(() => {
    setHeadings(getHeadings());
  }, [routes]);
  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;
  return (
    <Container as="main" className="docs__container" display="flex">
      <Header {...meta} />
      <Navbar />
      <Row className="docs__content">
        <Sticky offset={10} className="docs__left-sidebar">
          <Sidebar routes={routes} tag={tag} slug={slug} />
        </Sticky>
        <Col className="docs__center" span={isMobile ? 12 : 8}>
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
        {!isMobile && <Spacer x={1} />}
        <Sticky offset={10} className="docs__right-sidebar">
          <TableOfContent headings={headings} />
        </Sticky>
        <img
          className="hero__gradient-blue"
          src="/gradient-blue.png"
          alt="gradient blue background"
        />
        <img
          className="hero__gradient-violet"
          src="/gradient-violet.png"
          alt="gradient violet background"
        />
      </Row>
      <Footer />
      <style jsx>
        {`
          :global(.docs__left-sidebar) {
            width: 20%;
            max-height: calc(100vh - 4rem);
            overflow: auto;
            display: none;
          }
          :global(.docs__center) {
            z-index: 99;
            padding: 0 1.8rem !important;
          }
          :global(.docs__left-sidebar::-webkit-scrollbar) {
            width: 0px;
          }
          :global(.docs__content) {
            padding-top: 1rem;
          }
          :global(.docs__right-sidebar) {
            display: none;
          }
          :global(.hero__gradient-blue, .hero__gradient-violet) {
            top: 0;
            opacity: 0;
            position: fixed;
            animation: appear 200ms 100ms ease forwards;
          }
          :global(.hero__gradient-blue) {
            top: 30%;
            left: -40%;
            z-index: 1;
          }
          :global(.hero__gradient-violet) {
            display: none;
            z-index: 1;
            top: -50%;
            right: -40%;
          }
          @media only screen and (min-width: ${theme.breakpoints.lg.min}) {
            :global(.docs__right-sidebar, .hero__gradient-violet) {
              display: block;
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
