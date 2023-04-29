import {DefaultLayout} from "@/layouts";
import {Hero, FeaturesGrid, CustomThemes} from "@/components";
import landingContent from "@/content/landing";

const IndexPage = () => {
  return (
    <DefaultLayout>
      <Hero />
      <FeaturesGrid features={landingContent.topFeatures} />
      <CustomThemes />
    </DefaultLayout>
  );
};

export default IndexPage;
