import {FC} from "react";

import {Head} from "./head";
import {Navbar} from "./navbar";
import {Footer} from "./footer";

import {Route} from "@/libs/docs/page";
import {MetaProps} from "@/libs/docs/meta";
import {DocsToc, DocsSidebar} from "@/components/docs";

export interface DocsLayoutProps {
  routes: Route[];
  currentRoute?: Route;
  prevRoute?: Route;
  nextRoute?: Route;
  meta?: MetaProps;
  tag?: string;
  slug?: string;
  children?: React.ReactNode;
}

export const DocsLayout: FC<DocsLayoutProps> = ({
  children,
  routes,
  currentRoute,
  tag,
  slug,
  meta,
}) => {
  // const [headings, setHeadings] = useState<Heading[]>([]);

  // useEffect(() => {
  //   setHeadings(getHeadings());
  // }, [routes]);

  // const editUrl = `${GITHUB_URL}/${REPO_NAME}/edit/${TAG}/${CONTENT_PATH}${currentRoute?.path}`;

  return (
    <div id="app-container">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl min-h-[calc(100dvh_-_64px_-_108px)] px-6">
        <div className="grid grid-cols-12">
          <div className="col-span-0 lg:col-span-3 mt-8 pr-4">
            <DocsSidebar routes={routes} slug={slug} tag={tag} />
          </div>
          <div className="col-span-12 lg:col-span-9 xl:col-span-7 mt-10">{children}</div>
          <div className="col-span-0 xl:col-span-2 mt-8 text-right">
            <DocsToc currentRoute={currentRoute} meta={meta} routes={routes} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
