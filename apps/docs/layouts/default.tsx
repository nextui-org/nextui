import {ReactNode, FC} from "react";

import {Head} from "./head";
import {Footer} from "./footer";

import {Navbar} from "@/components/navbar";
import {Route} from "@/libs/docs/page";
export interface DefaultLayoutProps {
  routes: Route[];
  tag?: string;
  slug?: string;
  children: ReactNode;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({children, routes, slug, tag}) => {
  return (
    <div id="app-container">
      <Head />
      <Navbar routes={routes} slug={slug} tag={tag} />
      <main className="container mx-auto max-w-7xl px-6">{children}</main>
      <Footer />
    </div>
  );
};
