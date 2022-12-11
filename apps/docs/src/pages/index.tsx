import React from "react";
import {GetStaticProps} from "next";
import router, {useRouter} from "next/router";
import {
  FeaturesGrid,
  Hero,
  Section,
  Community,
  InstallBanner,
  CustomThemesSection,
  ComparationSection,
  DarkModeSection,
  CustomizationSection,
  BuiltInStitchesSection,
  LastButNotLeastSection,
  SupportSection,
} from "@components";
import landingContent from "@content/landing";
import DefaultLayout from "@layouts/default";
import {getSlug} from "@lib/docs/utils";
import {Route, getCurrentTag, fetchDocsManifest} from "@lib/docs/page";
import {Sponsor, getSponsors} from "@lib/docs/sponsors";
import {Action, useRegisterActions} from "kbar";
import {Spacer} from "@nextui-org/react";
import {getId} from "@utils/collections";

interface Props {
  routes: Route[];
  sponsors: Sponsor[];
  currentRoute: Route;
}

const IndexPage: React.FC<Props> = ({routes, sponsors, currentRoute}) => {
  const {query} = useRouter();
  const {tag, slug} = getSlug(query);

  // kbar home action
  const homeAction: Action = React.useMemo(() => {
    return {
      id: getId(),
      name: "Getting started",
      section: "Scope",
      shortcut: [],
      keywords: "help, docs, go, started, getting started, nextui",
      perform: () => router.push("/docs/guide/getting-started"),
    };
  }, [routes]);

  useRegisterActions([homeAction]);

  return (
    <DefaultLayout currentRoute={currentRoute} routes={routes} slug={slug} tag={tag}>
      {/* Hero */}
      <Hero />
      {/* Main features */}
      <Section>
        <FeaturesGrid features={landingContent.topFeatures} />
      </Section>
      <CustomThemesSection />
      <ComparationSection />
      <DarkModeSection />
      <CustomizationSection />
      <BuiltInStitchesSection />
      <LastButNotLeastSection />
      <SupportSection sponsors={sponsors} />
      {/* Installation banner */}
      <Section css={{zIndex: "$10"}}>
        <Spacer css={{"@xsMax": {mt: "$16"}}} y={6} />
        <InstallBanner />
      </Section>
      <Spacer y={6} />
      <Section>
        <Community />
      </Section>
      <Spacer y={4} />
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
