import {FC, useEffect, useState} from "react";
import {Link as NextUILink, Image} from "@nextui-org/react";
import Link from "next/link";
import dynamic from "next/dynamic";

import {Head} from "./head";
import {Navbar} from "./navbar";
import {Footer} from "./footer";

import {Route} from "@/libs/docs/page";
import {MetaProps} from "@/libs/docs/meta";
import {Heading, getHeadings} from "@/utils/docs-utils";
import {FooterNav, DocsToc} from "@/components/docs";
import {GITHUB_URL, REPO_NAME} from "@/libs/github/constants";
import {CONTENT_PATH, TAG} from "@/libs/docs/config";
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

const DocsSidebar = dynamic(
  () => import("@/components/docs/sidebar").then((mod) => mod.DocsSidebar),
  {ssr: false},
);

export const DocsLayout: FC<DocsLayoutProps> = ({
  children,
  routes,
  currentRoute,
  prevRoute,
  nextRoute,
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
      <Head {...meta} />
      <Navbar routes={routes} slug={slug} tag={tag} />
      <main className="container mx-auto max-w-7xl min-h-[calc(100vh_-_64px_-_108px)] px-6 mb-12">
        <div className="grid grid-cols-12">
          <div className="hidden relative lg:block lg:col-span-2 mt-8 pr-4">
            <DocsSidebar routes={routes} slug={slug} tag={tag} />
          </div>
          <div className="col-span-12 lg:col-span-10 xl:col-span-8 lg:px-16 mt-10">
            <div className="w-full prose prose-neutral">{children}</div>
            <FooterNav nextRoute={nextRoute} prevRoute={prevRoute} tag={tag} />
            <footer>
              {tag ? (
                <NextUILink as={Link} href={slug || ""} size="sm">
                  Go to the live version of this page
                </NextUILink>
              ) : (
                <NextUILink isExternal showAnchorIcon href={editUrl} size="sm">
                  Edit this page on GitHub
                </NextUILink>
              )}
            </footer>
          </div>
          <div className="hidden xl:flex xl:col-span-2 mt-8 pl-4">
            <DocsToc headings={headings} />
          </div>
        </div>
      </main>
      <Footer align="right" />

      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-[-10]"
      >
        <Image
          removeWrapper
          alt="docs left background"
          className="z-[-10]"
          src="/gradients/docs-left.svg"
        />
      </div>

      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-[-10] rotate-12"
      >
        <Image
          removeWrapper
          alt="docs right background"
          className="z-[-10]"
          src="/gradients/docs-right.svg"
        />
      </div>
    </div>
  );
};
