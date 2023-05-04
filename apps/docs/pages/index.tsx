import {FC} from "react";
import {GetStaticProps} from "next";
import {Spacer} from "@nextui-org/react";

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
} from "@/components/marketing";
import landingContent from "@/content/landing";
import {getSponsors, Sponsor} from "@/libs/sponsors";

interface Props {
  sponsors: Sponsor[];
}

const IndexPage: FC<Props> = ({sponsors}) => {
  return (
    <DefaultLayout>
      <Hero />
      <FeaturesGrid features={landingContent.topFeatures} />
      <CustomThemes />
      <A11yOtb />
      <DarkMode />
      <Customization />
      <LastButNotLeast />
      <Support sponsors={sponsors} />
      <Spacer y={48} />
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const sponsors = await getSponsors();

  return {
    props: {
      sponsors,
    },
  };
};

export default IndexPage;
