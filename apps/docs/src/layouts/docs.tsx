import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { Container, Row, Col } from '@nextui-org/react';
import NextLink from 'next/link';
import { Route } from '@lib/docs/page';
import { Sidebar, TableOfContent } from '@components';
import { Link } from '@nextui-org/react';
import { Heading, getHeadings } from '@utils/get-headings';
import { MetaProps } from '@lib/docs/meta';
import Header from '@layouts/header';
import { Fixed, PageNav } from '@components';
import { REPO_NAME, GITHUB_URL } from '@lib/github/constants';
import { TAG, CONTENT_PATH } from '@lib/docs/config';
import { StyledImg } from '@primitives';
import { darkTheme } from '@theme/shared';
import { appears } from '@utils/animations';

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
  meta
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    setHeadings(getHeadings());
  }, [routes]);

  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;

  return (
    <>
      <Navbar routes={routes} />
      <Container
        lg={true}
        as="main"
        className="docs__container"
        display="flex"
        css={{ position: 'relative' }}
      >
        <Header {...meta} />
        <Row
          className="docs__content"
          gap={0}
          css={{
            '@lg': {
              pt: '1rem'
            }
          }}
        >
          <Col
            css={{
              width: '32%',
              display: 'none',
              '@md': {
                display: 'block'
              }
            }}
          >
            <Fixed
              offset={92}
              className="docs__left-sidebar"
              css={{
                maxHeight: 'calc(100vh - 4rem)',
                overflow: 'auto',
                zIndex: '$2',
                pb: '$28',
                '&::-webkit-scrollbar': {
                  width: '0px'
                }
              }}
            >
              <Sidebar routes={routes} tag={tag} slug={slug} />
            </Fixed>
          </Col>
          <Col
            className="docs__center"
            css={{
              zIndex: '$10',
              maxWidth: '100%',
              overflow: 'auto',
              '@xsMax': {
                p: 0
              }
            }}
          >
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
          <Col
            css={{
              width: '28%',
              height: '100%',
              display: 'none',
              '@lg': {
                display: 'block'
              }
            }}
          >
            <Fixed
              offset={92}
              className="docs__right-sidebar"
              css={{
                width: '100%',
                zIndex: '$2',
                pb: '$20',
                '&::-webkit-scrollbar': {
                  width: '0px'
                }
              }}
            >
              <TableOfContent headings={headings} />
            </Fixed>
          </Col>
          <StyledImg
            className="docs__gradient-blue"
            src="/gradient-left-dark.svg"
            alt="gradient blue background"
            css={{
              display: 'none',
              opacity: 0,
              position: 'fixed',
              zIndex: '$1',
              bottom: '-50%',
              left: '-10%',
              right: '-50%',
              animation: `${appears} 200ms 100ms ease forwards`,
              [`.${darkTheme} &`]: {
                display: 'block'
              }
            }}
          />
          <StyledImg
            className="docs__gradient-violet"
            src="/gradient-right-dark.svg"
            alt="gradient violet background"
            css={{
              display: 'none',
              top: 0,
              opacity: 0,
              position: 'fixed',
              animation: `${appears} 200ms 100ms ease forwards`,
              '@lg': {
                top: '-50%',
                right: '-50%'
              },
              '@mdMax': {
                top: '-35%',
                right: '-45%'
              },
              [`.${darkTheme} &`]: {
                display: 'block'
              }
            }}
          />
        </Row>
        <Footer css={{ jc: 'flex-end' }} />
      </Container>
    </>
  );
};

export default DocsLayout;
