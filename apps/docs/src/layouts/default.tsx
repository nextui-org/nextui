import React from "react";
import {Container} from "@nextui-org/react";
import {Route} from "@lib/docs/page";

import Header from "./header";
import Footer from "./footer";
import Navbar from "./navbar";

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  tag?: string;
  slug?: string;
}

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = ({children, routes}) => {
  return (
    <div id="app-container">
      <Header />
      <Navbar isHome routes={routes} />
      <Container
        alignContent="space-between"
        as="main"
        className="main-container"
        css={{
          position: "relative",
          minHeight: "100vh",
          "@mdMax": {
            overflowX: "hidden",
          },
        }}
        display="flex"
        id="main-container"
        lg={true}
      >
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default DefaultLayout;
