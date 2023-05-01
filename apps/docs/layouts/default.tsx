import {ReactNode, FC} from "react";

import {Head} from "./head";
import {Navbar} from "./navbar";

export interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
  return (
    <div id="app-container">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6">{children}</main>
    </div>
  );
};
