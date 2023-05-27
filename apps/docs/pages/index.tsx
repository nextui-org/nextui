import {FC} from "react";
import {GetStaticProps} from "next";
import {Spacer} from "@nextui-org/react";
import {useRouter} from "next/router";

import {DefaultLayout} from "@/layouts";
import {
  Hero,
  FeaturesGrid,
  CustomThemes,
  A11yOtb,
  DarkMode,
  Customization,
  LastButNotLeast,
  Support,
  InstallBanner,
  Community,
} from "@/components/marketing";
import landingContent from "@/content/landing";
import {Route, getCurrentTag, fetchDocsManifest} from "@/libs/docs/page";
import {getSponsors, Sponsor} from "@/libs/docs/sponsors";
import {getSlug} from "@/libs/docs/utils";

interface Props {
  routes: Route[];
  sponsors: Sponsor[];
}

const IndexPage: FC<Props> = ({sponsors, routes}) => {
  const {query} = useRouter();
  const {tag, slug} = getSlug(query);

  return (
    <DefaultLayout routes={routes} slug={slug} tag={tag}>
      <Hero />
      <FeaturesGrid features={landingContent.topFeatures} />
      <CustomThemes />
      <A11yOtb />
      <DarkMode />
      <Customization />
      <LastButNotLeast />
      <Support sponsors={sponsors} />
      <Spacer y={24} />
      <InstallBanner />
      <Community />
      <Spacer y={24} />
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);
  const sponsors = await getSponsors();

  return {
    props: {
      routes: manifest.routes,
      sponsors,
    },
  };
};

export default IndexPage;
