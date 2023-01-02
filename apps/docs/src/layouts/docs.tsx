import React, {useState, useEffect} from "react";
import {Container, Row, Col, Link} from "@nextui-org/react";
import NextLink from "next/link";
import {Route} from "@lib/docs/page";
import {Heading, getHeadings} from "@utils/get-headings";
import {MetaProps} from "@lib/docs/meta";
import Header from "@layouts/header";
import {Fixed, PageNav, TableOfContent, Sidebar} from "@components";
import {REPO_NAME, GITHUB_URL} from "@lib/github/constants";
import {TAG, CONTENT_PATH} from "@lib/docs/config";
import {StyledImg} from "@primitives";
import {darkTheme} from "@theme/shared";
import {appears} from "@utils/animations";

import Footer from "./footer";
import Navbar from "./navbar";

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  prevRoute?: Route;
  nextRoute?: Route;
  meta?: MetaProps;
  tag?: string;
  slug?: string;
  children?: React.ReactNode;
}

const DocsLayout: React.FC<Props> = ({
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

  useEffect(() => {
    setHeadings(getHeadings());
  }, [routes]);

  const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;

  return (
    <div id="app-container">
      <Header {...meta} />
      <Navbar routes={routes} />
      <Container
        as="main"
        className="docs__container"
        css={{position: "relative"}}
        display="flex"
        id="main-container"
        lg={true}
      >
        <Row
          className="docs__content"
          css={{
            "@lg": {
              pt: "1rem",
            },
          }}
          gap={0}
        >
          <Col
            css={{
              width: "32%",
              display: "none",
              "@md": {
                display: "block",
              },
            }}
          >
            <Fixed
              className="docs__left-sidebar"
              css={{
                maxHeight: "calc(100vh - 4rem)",
                overflow: "auto",
                zIndex: "$2",
                pb: "$28",
                "&::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
              offset={92}
            >
              <Sidebar routes={routes} slug={slug} tag={tag} />
            </Fixed>
          </Col>
          <Col
            className="docs__center"
            css={{
              zIndex: "$10",
              maxWidth: "100%",
              overflow: "auto",
              mt: "$$navbarHeight",
              "@xsMax": {
                p: 0,
              },
            }}
          >
            {children}
            <PageNav nextRoute={nextRoute} prevRoute={prevRoute} tag={tag} />
            <footer>
              {tag ? (
                <NextLink href={slug || ""}>
                  <Link>
                    <small>Go to the live version of this page</small>
                  </Link>
                </NextLink>
              ) : (
                <a href={editUrl} rel="noopener noreferrer" target="_blank">
                  <small>Edit this page on GitHub</small>
                </a>
              )}
            </footer>
          </Col>
          <Col
            css={{
              width: "28%",
              height: "100%",
              display: "none",
              "@lg": {
                display: "block",
              },
            }}
          >
            <Fixed
              className="docs__right-sidebar"
              css={{
                width: "100%",
                zIndex: "$2",
                pb: "$20",
                "&::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
              offset={92}
            >
              <TableOfContent headings={headings} />
            </Fixed>
          </Col>
          <StyledImg
            alt="gradient blue background"
            className="docs__gradient-blue"
            css={{
              display: "none",
              opacity: 0,
              position: "fixed",
              zIndex: "$1",
              bottom: "-50%",
              left: "-10%",
              right: "-50%",
              animation: `${appears} 200ms 100ms ease forwards`,
              [`.${darkTheme} &`]: {
                display: "block",
              },
            }}
            src="/gradient-left-dark.svg"
          />
          <StyledImg
            alt="gradient violet background"
            className="docs__gradient-violet"
            css={{
              display: "none",
              top: 0,
              opacity: 0,
              position: "fixed",
              animation: `${appears} 200ms 100ms ease forwards`,
              "@lg": {
                top: "-50%",
                right: "-50%",
              },
              "@mdMax": {
                top: "-35%",
                right: "-45%",
              },
              [`.${darkTheme} &`]: {
                display: "block",
              },
            }}
            src="/gradient-right-dark.svg"
          />
        </Row>
        <Footer css={{jc: "flex-end"}} />
      </Container>
    </div>
  );
};

export default DocsLayout;
