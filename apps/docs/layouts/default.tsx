import {ReactNode, FC} from "react";

import {DocsNavbar} from "@/components";

export interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
  return (
    <>
      <DocsNavbar />
      <main className="container mx-auto max-w-7xl px-6">{children}</main>
    </>
  );
};
